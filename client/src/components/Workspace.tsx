import React from 'react'
import RecordPanel from './RecordPanel'
import ShiftsPanel from './ShiftsPanel';
import EspecialitiesPanel from './EspecialitiesPanel';
import ScheduleApModal from './ScheduleApModal';
import { Calendar } from "@/components/ui/calendar"
import { useState } from 'react';


function Workspace() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())
	
    const [IsOpen, SetIsOpen] = useState(false)

  return (
		<>
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
