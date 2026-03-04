const BASE_URL = "http://localhost:3000";

export const getSpecialities = async () => {
  const response = await fetch(`${BASE_URL}/specialities`);

  if (!response.ok) {
    throw new Error("Error al obtener especialidades");
  }

  return response.json();
};