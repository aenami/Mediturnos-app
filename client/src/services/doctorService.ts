const BASE_URL = "http://localhost:3000";

export const getDoctorsBySpeciality = async (id_speciality: number) => {
  const response = await fetch(
    `${BASE_URL}/doctors/specialities/${id_speciality}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener doctores");
  }

  return response.json();
};