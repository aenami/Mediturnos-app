import React from 'react'
import RecordPanel from './RecordPanel'
import ShiftsPanel from './ShiftsPanel';
import EspecialitiesPanel from './EspecialitiesPanel';
import ScheduleApModal from './ScheduleApModal';
import { Calendar } from "@/components/ui/calendar"
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar'

function Workspace() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
	const [appointmentDates, setAppointmentDates] = useState<Date[]>([]);	
	
    const [IsOpen, SetIsOpen] = useState(false)

	useEffect(() => {
		const fetchUpcomingShifts = async () => {
			try {
				const response = await fetch("http://localhost:3000/appointments/user");
				const data = await response.json();

				const now = new Date();

				const upcomingDates = data
					.filter((shift: any) => new Date(shift.fecha) >= now)
					.map((shift: any) => {
						const date = new Date(shift.fecha);

						// Normalizamos para evitar problemas de zona horaria
						return new Date(
							date.getFullYear(),
							date.getMonth(),
							date.getDate()
						);
					});

				setAppointmentDates(upcomingDates);

			} catch (error) {
				console.error("Error cargando fechas del calendario:", error);
			}
		};

		fetchUpcomingShifts();
	}, []);

  return (
		<>
			<Navbar/>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-4 p-6">
				<div className="lg:col-span-2 space-y-4">
        
					<div className="bg-gray-100 p-6 rounded-xl h-48 flex flex-col justify-between items-center">
						<span>Agenda tu cita medica en linea</span>
						<span>Consulta rapida y segura</span>

                        
						<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 cursor-pointer" 
                        onClick={ () =>{SetIsOpen(true)}}>
							Reserva turno
						</button>

					</div>

                    {IsOpen && 
                        <ScheduleApModal onClose={ () => SetIsOpen(false) }/>
                    }

					<EspecialitiesPanel/>

					<ShiftsPanel/>

				</div>

				<div className="bg-gray-100 p-6 rounded-xl h-full">
                    <div className="w-full overflow-x-auto">
                        <Calendar
							mode="single"
							selected={date}
							onSelect={setDate}
							modifiers={{
								booked: appointmentDates
							}}
							modifiersClassNames={{
								booked: "bg-blue-600 text-white rounded-md"
							}}
							className="rounded-lg border w-full"
						/>
                    </div>
                    
					<RecordPanel/>

				</div>

			</div>
		</>
  );
}

export default Workspace
