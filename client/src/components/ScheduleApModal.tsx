import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

type ModalProps = {
  onClose: () => void;
};

function ScheduleApModal({ onClose }: ModalProps) {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [isVisible, setIsVisible] = useState(false);

  interface Doctor {
    id_doctor: number;
    nombre_doctor: string;
    apellidos_doctor: string;
  }

  interface Speciality {
    id_especialidad: number;
    nombre_especialidad: string;
  }

  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);
  const [doctorDates, setDoctorDates] = useState<Date[]>([]);

  // -------------------- BLOQUEAR SCROLL DEL BODY --------------------
  useEffect(() => {
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsVisible(true), 10);

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // -------------------- FETCH SPECIALITIES --------------------
  useEffect(() => {
    fetch("http://localhost:3000/specialities")
      .then((res) => res.json())
      .then((data) => setSpecialities(data))
      .catch((error) =>
        console.error("Error al traer especialidades:", error)
      );
  }, []);

  const handlerSpecialtyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id_specialty = Number(e.target.value);

    setSelectedSpecialty(id_specialty);
    setSelectedDoctor(null);
    setDoctors([]);
    setDoctorDates([]);
    setDate(undefined);

    try {
      const res = await fetch(
        `http://localhost:3000/doctors/specialities/${id_specialty}`
      );
      const data = await res.json();
      setDoctors(data);
      setStep(2);
    } catch (error) {
      console.error("Error al traer doctores:", error);
    }
  };

  const handlerDoctorChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id_doctor = Number(e.target.value);

    setSelectedDoctor(id_doctor);
    setDoctorDates([]);
    setDate(undefined);

    try {
      const res = await fetch(
        `http://localhost:3000/appointments/doctors/${id_doctor}`
      );

      const data = await res.json();
      const parsedDates = data.map((d: string) => new Date(d));
      setDoctorDates(parsedDates);

      setStep(3);
    } catch (error) {
      console.error("Error al traer fechas ocupadas:", error);
    }
  };

  const isDateDisabled = (currentDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (currentDate < today) return true;

    return doctorDates.some(
      (d) => d.toDateString() === currentDate.toDateString()
    );
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      
      {/* Overlay con blur real */}
      <div
        onClick={handleClose}
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Modal */}
      <div
        className={`relative w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 transform ${
          isVisible
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Agendar Nueva Cita
        </h2>

        <form className="space-y-6">
          {/* STEP 1 */}
          {step >= 1 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Especialidad
              </label>

              <select
                value={selectedSpecialty ?? ""}
                onChange={handlerSpecialtyChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled>
                  Selecciona una especialidad...
                </option>

                {specialities.map((s) => (
                  <option
                    key={s.id_especialidad}
                    value={s.id_especialidad}
                  >
                    {s.nombre_especialidad}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 2 */}
          {step >= 2 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-600">
                Doctor
              </label>

              <select
                value={selectedDoctor ?? ""}
                onChange={handlerDoctorChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="" disabled>
                  Selecciona un doctor...
                </option>

                {doctors.map((doc) => (
                  <option
                    key={doc.id_doctor}
                    value={doc.id_doctor}
                  >
                    {doc.nombre_doctor} {doc.apellidos_doctor}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 3 */}
          {step >= 3 && (
            <div className="pt-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                className="rounded-xl border"
              />
            </div>
          )}

          {/* BUTTONS */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-5 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!selectedDoctor || !date}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-40"
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