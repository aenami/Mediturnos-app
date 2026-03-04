import React from 'react'

function RecordPanel() {

    
  return (
      <div className="bg-gray-100 p-6 rounded-xl">
          <div className="flex justify-between mb-4">

              <span>Historial</span>
          </div>
          <div className="space-y-2">
              <div className="bg-white h-14 rounded-lg border">
                  Dr. 1
              </div>
              <div className="bg-white h-14 rounded-lg border">
                  Dr. 2
              </div>
          </div>
      </div>
  )
}

export default RecordPanel
