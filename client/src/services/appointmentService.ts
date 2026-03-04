const BASE_URL = "http://localhost:3000";

export const getDoctorAppointments = async (id_doctor: number) => {
  const response = await fetch(
    `${BASE_URL}/appointments/doctors/${id_doctor}`
  );

  if (!response.ok) {
    throw new Error("Error al obtener citas del doctor");
  }

  return response.json();
};

export const createAppointment = async (payload: {
  id_doctor: number;
  fecha: string;
  hora: string;
}) => {
  const response = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Error al crear la cita");
  }

  return response.json();
};