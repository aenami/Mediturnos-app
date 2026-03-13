import React, { useEffect, useState } from "react";
import { apiFetch } from "@/services/api";

interface Shift {
  fecha: string;
  hora: string;
  nombre_doctor: string;
  apellidos_doctor: string;
  nombre_especialidad: string;
  id_cita: number;
}

function ShiftsPanel() {
  const [shifts, setShifts] = useState<Shift[]>([]);
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Traer citas futuras
  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const data = await apiFetch<Shift[]>("/appointments/user");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const futureShifts = data.filter((shift) => {
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

  // ---------------- MODAL CANCELAR ----------------
  if (selectedShift && !successMessage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md space-y-4 text-center">
          <h2 className="text-xl font-bold">
            ¿Cancelar esta cita?
          </h2>

          <p className="text-gray-600">
            {new Date(selectedShift.fecha).toLocaleDateString()} - {selectedShift.hora}
          </p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={() => setSelectedShift(null)}
              className="px-4 py-2 bg-gray-200 rounded-lg"
            >
              No
            </button>

            <button
              onClick={async () => {
                try {
                  await apiFetch(`/appointments/${selectedShift.id_cita}`, {
                    method: "DELETE",
                  });

                  setSuccessMessage("La cita fue cancelada correctamente");
                  setSelectedShift(null);

                  // actualizar lista local
                  setShifts((prev) =>
                    prev.filter((s) => s.id_cita !== selectedShift.id_cita)
                  );
                } catch (error) {
                  console.error("Error cancelando cita:", error);
                }
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Sí, cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------------- MODAL CONFIRMACION ----------------
  if (successMessage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
        <div className="bg-white p-6 rounded-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-xl font-bold text-green-600">
            ¡Cita cancelada!
          </h2>

          <p>{successMessage}</p>

          <button
            onClick={() => setSuccessMessage(null)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Entendido
          </button>
        </div>
      </div>
    );
  }

  // ---------------- UI ----------------
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
          shifts.slice(0, 3).map((shift) => (
            <div
              key={shift.id_cita}
              className="bg-white p-4 rounded-lg border shadow-sm hover:shadow-md transition flex justify-between items-center"
            >
              <div>
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

              <button
                onClick={() => setSelectedShift(shift)}
                className="bg-red-100 text-red-600 hover:bg-red-500 hover:text-white font-semibold px-4 py-2 rounded-lg transition duration-300 border border-red-300"
              >
                Cancelar
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ShiftsPanel;