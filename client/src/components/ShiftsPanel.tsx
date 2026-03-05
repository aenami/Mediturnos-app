import React, { useEffect, useState } from "react";

interface Shift {
  fecha: string;
  hora: string;
  nombre_doctor: string;
  apellidos_doctor: string;
  nombre_especialidad: string;
}

function ShiftsPanel() {
  const [shifts, setShifts] = useState<Shift[]>([]);

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const res = await fetch("http://localhost:3000/appointments/user");
        const data = await res.json();

        // Filtrar solo futuras (doble seguridad)
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureShifts = data.filter((shift: Shift) => {
          const shiftDate = new Date(shift.fecha);
          return shiftDate >= today;
        });

        setShifts(futureShifts);

      } catch (error) {
        console.error("Error cargando turnos:", error);
      }
    };

    fetchShifts();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">
          Turnos Asignados
        </span>
      </div>

      <div className="space-y-3">
        {shifts.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No tienes turnos agendados.
          </div>
        ) : (
          shifts.slice(0, 3).map((shift, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition"
            >
              <div className="font-medium">
                {shift.nombre_especialidad}
              </div>

              <div className="text-sm text-gray-600">
                Dr. {shift.nombre_doctor} {shift.apellidos_doctor}
              </div>

              <div className="text-sm text-blue-600 mt-1">
                {shift.fecha.split("T")[0]} - {shift.hora}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShiftsPanel;