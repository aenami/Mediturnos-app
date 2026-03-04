import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useMemo } from "react";

type ModalProps = {
    onClose: () => void;
};

interface Doctor {
    id_doctor: number;
    nombre_doctor: string;
    apellidos_doctor: string;
}

interface Speciality {
    id_especialidad: number;
    nombre_especialidad: string;
}

interface Appointment {
    fecha: string;
    hora: string;
}

function ScheduleApModal({ onClose }: ModalProps) {
    const [step, setStep] = useState(1);
    const [date, setDate] = useState<Date | undefined>();
    const [selectedHour, setSelectedHour] = useState<string | null>(null);

    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

    // -------------------- FETCH SPECIALITIES --------------------
    useEffect(() => {
        fetch("http://localhost:3000/specialities")
            .then((res) => res.json())
            .then(setSpecialities);
    }, []);

    // -------------------- GENERAR HORARIOS BASE --------------------
    const generateBaseHours = () => {
        const hours: string[] = [];

        for (let h = 8; h <= 16; h++) {
            if (h === 12) continue; // Almuerzo

            const formatted = `${h.toString().padStart(2, "0")}:00`;
            hours.push(formatted);
        }

        return hours;
    };
    
    // -------------------- FILTRAR HORARIOS DISPONIBLES --------------------
    const availableHours = useMemo(() => {
        if (!date || !selectedDoctor) return [];

        const baseHours = generateBaseHours();
        const selectedDateString = date.toISOString().split("T")[0];

        const occupiedHours = appointments
            .filter((a) => a.fecha === selectedDateString)
            .map((a) => a.hora);

        return baseHours.filter(
            (hour) => !occupiedHours.includes(hour)
        );
    }, [date, selectedDoctor, appointments]);

    // -------------------- HANDLERS --------------------
    const handlerSpecialtyChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id_specialty = Number(e.target.value);

        setSelectedSpecialty(id_specialty);
        setSelectedDoctor(null);
        setDoctors([]);
        setAppointments([]);
        setDate(undefined);
        setSelectedHour(null);

        const res = await fetch(
            `http://localhost:3000/doctors/specialities/${id_specialty}`
        );

        const data = await res.json();
        setDoctors(data);
        setStep(2);
    };

    const handlerDoctorChange = async (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => {
        const id_doctor = Number(e.target.value);

        setSelectedDoctor(id_doctor);
        setDate(undefined);
        setSelectedHour(null);

        const res = await fetch(
            `http://localhost:3000/appointments/doctors/${id_doctor}`
        );

        const data = await res.json();
        setAppointments(data);

        setStep(3);
    };

    const isDateDisabled = (currentDate: Date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return currentDate < today;
    };

    // -------------------- POST APPOINTMENT --------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDoctor || !date || !selectedHour) return;

        const payload = {
            id_doctor: selectedDoctor,
            fecha: date.toISOString().split("T")[0],
            hora: selectedHour,
        };

        try {
            await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            alert("Cita agendada correctamente 🎉");
            onClose();
        } catch (error) {
            console.error("Error al crear cita:", error);
        }
    };

    // -------------------- UI --------------------
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">Agendar Nueva Cita</h2>

                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* ESPECIALIDAD */}
                    <select
                        value={selectedSpecialty ?? ""}
                        onChange={handlerSpecialtyChange}
                        className="w-full border rounded-xl p-3"
                    >
                        <option value="" disabled>
                            Selecciona especialidad...
                        </option>
                        {specialities.map((s) => (
                            <option key={s.id_especialidad} value={s.id_especialidad}>
                                {s.nombre_especialidad}
                            </option>
                        ))}
                    </select>

                    {/* DOCTOR */}
                    {step >= 2 && (
                        <select
                            value={selectedDoctor ?? ""}
                            onChange={handlerDoctorChange}
                            className="w-full border rounded-xl p-3"
                        >
                            <option value="" disabled>
                                Selecciona doctor...
                            </option>
                            {doctors.map((doc) => (
                                <option key={doc.id_doctor} value={doc.id_doctor}>
                                    {doc.nombre_doctor} {doc.apellidos_doctor}
                                </option>
                            ))}
                        </select>
                    )}

                    {/* CALENDARIO */}
                    {step >= 3 && (
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            disabled={isDateDisabled}
                        />
                    )}

                    {/* HORARIOS */}
                    {date && selectedDoctor && availableHours.length > 0 && (
                        <select
                            value={selectedHour ?? ""}
                            onChange={(e) => setSelectedHour(e.target.value)}
                            className="w-full border rounded-xl p-3"
                        >
                            <option value="" disabled>
                                Selecciona horario...
                            </option>

                            {availableHours.map((hour) => (
                                <option key={hour} value={hour}>
                                    {hour}
                                </option>
                            ))}
                        </select>
                    )}

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-xl"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={!selectedHour}
                            className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-40"
                        >
                            Confirmar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ScheduleApModal;