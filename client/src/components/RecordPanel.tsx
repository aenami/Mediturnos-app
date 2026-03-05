import React, { useEffect, useState } from "react";

function RecordPanel() {

  const [pastShifts, setPastShifts] = useState([]);

  useEffect(() => {
    const fetchPastShifts = async () => {
      try {
        const response = await fetch("http://localhost:3000/appointments/user"); // usuario id 1
        const data = await response.json();

        const now = new Date();

        const filtered = data
          .filter((shift: any) => new Date(shift.fecha) < now) // solo pasadas
          .sort((a: any, b: any) => 
            new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
          ) // más recientes primero
          .slice(0, 3); // máximo 3

        setPastShifts(filtered);

      } catch (error) {
        console.error("Error obteniendo historial:", error);
      }
    };

    fetchPastShifts();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-xl mt-4">
      <div className="flex justify-between mb-4">
        <span className="font-semibold">Historial</span>
      </div>

      <div className="space-y-3">
        {pastShifts.length === 0 ? (
          <div className="text-gray-500 text-sm">
            No tienes citas anteriores.
          </div>
        ) : (
          pastShifts.map((shift: any, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg border shadow-sm"
            >
              <div className="font-medium">
                {shift.nombre_especialidad}
              </div>

              <div className="text-sm text-gray-600">
                Dr. {shift.nombre_doctor} {shift.apellidos_doctor}
              </div>

              <div className="text-sm text-gray-500 mt-1">
                {shift.fecha.split("T")[0]} - {shift.hora}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default RecordPanel;