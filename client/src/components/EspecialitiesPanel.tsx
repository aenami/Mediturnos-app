import React, { useEffect, useState } from "react";

interface Speciality {
  id_especialidad: number;
  nombre_especialidad: string;
}

function EspecialitiesPanel() {
  const [specialities, setSpecialities] = useState<Speciality[]>([]);

  useEffect(() => {
    const fetchSpecialities = async () => {
      try {
        const res = await fetch("http://localhost:3000/specialities");
        const data = await res.json();

        // Solo tomamos las primeras 3
        setSpecialities(data.slice(0, 3));

      } catch (error) {
        console.error("Error cargando especialidades:", error);
      }
    };

    fetchSpecialities();
  }, []);

  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">
          Especialidades
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {specialities.map((speciality) => (
          <div
            key={speciality.id_especialidad}
            className="bg-white h-20 rounded-lg border shadow-sm flex items-center justify-center font-medium hover:shadow-md hover:scale-105 transition cursor-pointer"
          >
            {speciality.nombre_especialidad}
          </div>
        ))}
      </div>
    </div>
  );
}

export default EspecialitiesPanel;