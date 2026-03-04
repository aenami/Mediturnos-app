import React from 'react'
import { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"

// Definimos el tipo de funcion que recibiremos
type ModalProps = {
    onClose: () => void;
}

function ScheduleApModal( { onClose } : ModalProps) {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
    // Creamos el estado del flujo
    const[step, setSetp] = useState(1);

    // Definimos una interface que definira los tipos de datos que almacenara cada objeto de doctor
    interface Doctor {
        id_doctor: number;
        nombre_doctor: string;
        apellidos_doctor: string;
    }

    interface Especialities {
        id_especialidad: number;
        nombre_especialidad: string;
    }

    // Estados que almacenan datos de nuestro backend
    const [specialities, setSpecialities] = useState<Especialities[]>([])
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [selectedSpecialty, setSelectedSpecialty] = useState<number | null>(null);
    const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

    // Lista de fechas de citas relacionadas a un doctor
    const [doctorDates, setDoctorDates] = useState<Date[]>([])

    
    // ----HOOKS que realizan peticiones a nuestro backend
    useEffect( ()  => {
        fetch("http://localhost:3000/specialities")
            .then(res => res.json())
            .then(data => {
                setSpecialities(data) 
                console.log(data)})
            .catch((error) => {
                console.error('Hubo un error al realizar la peticion al backend: ',error); // "Hubo un error"
            })

    }, [])


    // Hanlders
    const handlerSpecialtyChange = async (e: React.ChangeEvent<HTMLSelectElement>) =>{
        // A partir del evento traermos el valor de la especialidad elegida
        const id_specialty = Number(e.target.value)
        setSelectedSpecialty(id_specialty) // Cambiamos el estado para saber que ya selecciono la especialidad

        try {
            // Inicialmente hace el fetch con el valor de null en slectedSpecialty
            const res = await fetch(`http://localhost:3000/doctors/specialities/${id_specialty}`)
            const data = await res.json()
            setDoctors(data)
            console.log('Doctores de la especialidad seleccionada: ', data)
            setSetp(2)
        } catch (error) {
            console.error('Error al realizar el fetch filtrando doctores por la especialidad que tengan: ', error)
        }
    }

    const handlerDoctorChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id_doctor = Number(e.target.value)
        setSelectedDoctor(id_doctor)

        // Traemos todas fechas de las citas en que el id de ese doctor coincida
        try {
            const res = await fetch(`http://localhost:3000/appointments/doctors/${id_doctor}`)
            const data = await res.json()
            setDoctorDates(data)
            setSetp(3)
            console.log('Fechas de citas asociadas al doctor: ', data)
        } catch (error) {
            console.error('Error al realizar el fetch para traer las fechas de las citas: ', error)
        }

    }

  return (
      <div className="fixed inset-0 flex items-center justify-center z-50">

          {/* Overlay */}
          <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={onClose}
          ></div>

          {/* Contenido del modal */}
          <div className="relative bg-white rounded-xl shadow-lg w-full max-w-md p-6 z-10">

              <h2 className="text-xl font-semibold mb-4">
                  Agendar Nueva Cita
              </h2>

              <form className="space-y-4">
                 {/* ----------Creacion del select para las ESPECIALIDADES ------------- */}
                  {step >= 1 && (
                      <>
                          <label>Selecciona una especialidad para tu cita</label>

                          <select onChange={handlerSpecialtyChange}>
                              <option disabled selected>
                                  Selecciona una especialidad...
                              </option>

                              {specialities.map(s => (
                                  <option key={s.id_especialidad} value={s.id_especialidad}>
                                      {s.nombre_especialidad}
                                  </option>
                              ))}
                          </select>
                      </>
                  )}

                  {/* ------Creacion del select para los DOCTORES ------*/}
                  {step >= 2 && (
                      <>
                          <label>Selecciona un doctor</label>

                          <select onChange={handlerDoctorChange}>
                              <option disabled selected>
                                  Selecciona un doctor
                              </option>

                              {doctors.map(doc => (
                                  <option key={doc.id_doctor} value={doc.id_doctor}>
                                      {doc.nombre_doctor}
                                  </option>
                              ))}
                          </select>
                      </>
                  )}

                    {/* ------Creacion del select para EL CALENDARIO ------*/}
                  {step >= 3 && (
                      <div className="w-full overflow-x-auto">
                          <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              className="rounded-lg border w-full"
                          />
                      </div>
                  )}

                  <div className="flex justify-end gap-2">
                      <button
                          type="button"
                          onClick={onClose}
                          className="px-4 py-2 rounded-lg bg-gray-200"
                      >
                          Cancelar
                      </button>

                      <button
                          type="submit"
                          className="px-4 py-2 rounded-lg bg-blue-600 text-white"
                      >
                          Confirmar
                      </button>
                  </div>
              </form>
          </div>

          
      </div>
  )
}

export default ScheduleApModal
