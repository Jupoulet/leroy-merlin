import React, { useState } from 'react';

const Modal = () => {
  const [selectedDrone, setSelectedDrone] = useState('')
  const handleChange = (e) => {
    setSelectedDrone(e.target.value)
  }

  const generateOptions
  return (
    <div className="modal">
      <div className="modal__content">
        <form onSubmit={(e) => e.preventDefault}>
          <label>Selectionnez un drone disponible</label>
          <select onChange={handleChange} value={selectedDrone}>
            {generateOptions()}
          </select>
        </form>
      </div>
    </div>
  )
}