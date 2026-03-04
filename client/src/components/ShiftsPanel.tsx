import React from 'react'

function ShiftsPanel() {
  return (
      <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex justify-between mb-4">
              <span>Turnos Asignados</span>
          </div>
          <div className="space-y-3">
              <div className="bg-white h-16 rounded-lg border w-full">
                  Cita 1
              </div>
              <div className="bg-white h-16 rounded-lg border w-full">
                  Cita 2
              </div>
          </div>
      </div>
  )
}

export default ShiftsPanel
