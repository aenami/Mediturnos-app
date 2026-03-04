import React, { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";

type ModalProps = {
  onClose: () => void;
};

function ScheduleApModal({ onClose }: ModalProps) {
  // -------------------- STEP FLOW --------------------
  const [step, setStep] = useState(1);

  // -------------------- DATE --------------------
  const [date, setDate] = useState<Date | undefined>(undefined);

  // -------------------- INTERFACES --------------------
  interface Doctor {
    id_doctor: number;
    nombre_doctor: string;
    apellidos_doctor: string;
  }

  interface Speciality {
    id_especialidad: number;
    nombre_especialidad: string;
  }

  // -------------------- STATES --------------------
  const [specialities, setSpecialities] = useState<Speciality[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const [doctorDates, setDoctorDates] = useState<Date[]>([]);

  // -------------------- FETCH SPECIALITIES --------------------
  useEffect(() => {
    fetch("http://localhost:3000/specialities")
      .then((res) => res.json())
      .then((data) => setSpecialities(data))
      .catch((error) =>
        console.error("Error al traer especialidades:", error)
      );
  }, []);

  // -------------------- HANDLERS --------------------

  // STEP 1 → Especialidad
  const handlerSpecialtyChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const id_specialty = Number(e.target.value);

    // Reset de estados dependientes
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

  // STEP 2 → Doctor
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

      // Convertimos strings → Date
      const parsedDates = data.map((d: string) => new Date(d));
      setDoctorDates(parsedDates);

      setStep(3);
    } catch (error) {
      console.error("Error al traer fechas ocupadas:", error);
    }
  };

  // -------------------- CALENDAR LOGIC --------------------
  const isDateDisabled = (currentDate: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Bloquear fechas pasadas
    if (currentDate < today) return true;

    // Bloquear fechas ocupadas
    const isOccupied = doctorDates.some(
      (d) => d.toDateString() === currentDate.toDateString()
    );

    return isOccupied;
  };

  // -------------------- UI --------------------
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">
        <h2 className="text-xl font-semibold mb-4">
          Agendar Nueva Cita
        </h2>

        <form className="space-y-4">
          {/* ---------------- STEP 1 ---------------- */}
          {step >= 1 && (
            <>
              <label>Selecciona una especialidad</label>

              <select
                value={selectedSpecialty ?? ""}
                onChange={handlerSpecialtyChange}
                className="w-full border rounded-lg p-2"
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
            </>
          )}

          {/* ---------------- STEP 2 ---------------- */}
          {step >= 2 && (
            <>
              <label>Selecciona un doctor</label>

              <select
                value={selectedDoctor ?? ""}
                onChange={handlerDoctorChange}
                className="w-full border rounded-lg p-2"
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
            </>
          )}

          {/* ---------------- STEP 3 ---------------- */}
          {step >= 3 && (
            <div className="w-full overflow-x-auto">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={isDateDisabled}
                className="rounded-lg border w-full"
              />
            </div>
          )}

          {/* ---------------- BUTTONS ---------------- */}
          <div className="flex justify-end gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-gray-200"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={!selectedDoctor || !date}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white disabled:opacity-50"
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