import React from 'react'

function EspecialitiesPanel() {
  return (
      <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex justify-between mb-4">
              <span>Especialidades</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white h-20 rounded-lg border">
                  Cardio
              </div>
              <div className="bg-white h-20 rounded-lg border">
                  Pedia
              </div>
              <div className="bg-white h-20 rounded-lg border">
                  Derma
              </div>
          </div>
      </div>
  )
}

export default EspecialitiesPanel
