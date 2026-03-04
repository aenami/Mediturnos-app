import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { useMemo } from "react";

import SpecialtySelect from "../components/appointments/SpecialtySelect";
import DoctorSelect from "../components/appointments/DoctorSelect";
import HourSelect from "../components/appointments/HoursSelect";

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

    const [reason, setReason] = useState("");
    const [specialities, setSpecialities] = useState<Speciality[]>([]);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

    const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
        const tomorrow = new Date();
        tomorrow.setHours(0, 0, 0, 0);
        tomorrow.setDate(tomorrow.getDate() + 1);

        return currentDate < tomorrow;
    };

    // -------------------- POST APPOINTMENT --------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDoctor || !date || !selectedHour) return;

        const payload = {
            id_doctor: selectedDoctor,
            fecha: date.toISOString().split("T")[0],
            hora: selectedHour,
            motivo: reason
        };

        try {
            await fetch("http://localhost:3000/appointments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            setSuccessMessage("¡Tu cita fue agendada correctamente!");
            
        } catch (error) {
            console.error("Error al crear cita:", error);
        }
    };

    // -------------------- UI --------------------
    if (successMessage) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
                <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md text-center space-y-6">

                    <div className="text-green-600 text-5xl">
                        ✓
                    </div>

                    <h2 className="text-2xl font-bold">
                        ¡Cita Confirmada!
                    </h2>

                    <p className="text-gray-600">
                        {successMessage}
                    </p>

                    <button
                        onClick={onClose}
                        className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                    >
                        Entendido
                    </button>
                </div>
            </div>
        );
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
                <h2 className="text-2xl font-bold mb-6">Agendar Nueva Cita</h2>

                <div className="overflow-y-auto px-8 py-6">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        <SpecialtySelect
                            specialities={specialities}
                            selectedSpecialty={selectedSpecialty}
                            onChange={handlerSpecialtyChange}
                        />

                        {selectedSpecialty && (
                            <DoctorSelect
                                doctors={doctors}
                                selectedDoctor={selectedDoctor}
                                onChange={handlerDoctorChange}
                            />
                        )}

                        {selectedDoctor && (
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                disabled={isDateDisabled}
                            />
                        )}

                        {date && selectedDoctor && (
                            <HourSelect
                                availableHours={availableHours}
                                selectedHour={selectedHour}
                                onChange={(e) => setSelectedHour(e.target.value)}
                            />
                        )}

                        {selectedHour && (
                            <div className="flex flex-col">
                                <label className="mb-2 font-medium">
                                    Motivo de la cita
                                </label>
                                <textarea
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    rows={3}
                                    className="border rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Describe brevemente el motivo..."
                                    required
                                />
                            </div>
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
                                disabled={!selectedHour || !reason.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-40"
                            >
                                Confirmar
                            </button>
                        </div>
                    </form>
                </div>
                
            </div>
        </div>
    );
}

export default ScheduleApModal;