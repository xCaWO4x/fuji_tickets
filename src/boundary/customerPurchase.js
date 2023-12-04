import React, { useState } from 'react';
import './customerPurchase.css';
import { useNavigate } from 'react-router-dom';

const CustomerPurchase = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [sections, setSections] = useState({
    left: { rows: 4, columns: 3 },
    center: { rows: 4, columns: 3 },
    right: { rows: 4, columns: 3 }
  });

  const selectSeat = (seatId) => {
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.includes(seatId)) {
        // If already selected, remove from the array
        return prevSelectedSeats.filter((id) => id !== seatId);
      } else {
        // If not selected, add to the array
        return [...prevSelectedSeats, seatId];
      }
    });
  };
  

  // Function to generate seating layout for all sections
  const generateSectionsLayout = () => {
    const maxRows = Math.max(...Object.values(sections).map(section => section.rows));
    let layout = [];
    for (let r = 0; r < maxRows; r++) {
      for (let sectionName of Object.keys(sections)) {
        for (let c = 0; c < sections[sectionName].columns; c++) {
          const seatId = `${sectionName[0].toUpperCase()}${r + 1}${c + 1}`;
          if (r < sections[sectionName].rows) {
            layout.push(
              <div 
                key={seatId} 
                className={`Seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                onClick={() => selectSeat(seatId)}
              >
                {seatId}
              </div>
            );
          }
        }
      }
    }
    return layout;
  };

const navigate = useNavigate();

return (
    <div className="CustomerPurchase">
      <div className="Seating-section">
        {generateSectionsLayout()}
      </div>
      <div className="Shopping-cart">
        <h3>Selected Seats</h3>
        <ul>
          {selectedSeats.map((seatId) => (
            <li key={seatId}>{seatId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default CustomerPurchase;
