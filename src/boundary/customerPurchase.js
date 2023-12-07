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
    const maxRows = Math.max(sections.left.rows, sections.center.rows, sections.right.rows);
    const totalColumns = sections.left.columns + sections.center.columns + sections.right.columns;

    let layout = [];
    const sectionLabels = (
      <div className="SectionLabels" key="section-labels">
        {['left', 'center', 'right'].map(sectionName => (
          <div className="SectionLabel" key={`${sectionName}-label`}>
            {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
          </div>
        ))}
      </div>
    );
    layout.push(sectionLabels);
    for (let r = 0; r < maxRows; r++) {
      let rowSeats = [];
      let cumulativeColumns = 0;
    
      for (let sectionName of ['left', 'center', 'right']) {
        const section = sections[sectionName];
        for (let c = 0; c < section.columns; c++) {
          if (r < section.rows) {
            const seatNum = String.fromCharCode('A'.charCodeAt(0) + r) + (c + 1);
            rowSeats.push(
              <div className="Seat" key={`${sectionName}-seat-${r}-${cumulativeColumns + c}`}>
                {seatNum}
              </div>
            );
          } else {
            // Add placeholder for invisible seats
            rowSeats.push(<div className="Seat Invisible" key={`${sectionName}-seat-${r}-${cumulativeColumns + c}`}></div>);
          }
        }
        cumulativeColumns += section.columns;
      }
    
      // Create a new row element for the current row of seats
      const rowElement = (
        <div className="Row" key={`row-${r}`}>
          {rowSeats}
        </div>
      );
      layout.push(rowElement);
    }



  return (
    <div className="Seating-section">
      {layout}
    </div>
  );
};

const navigate = useNavigate();

return (
    <div className="CustomerPurchase">
      <div className="Seating-section">
        {Object.keys(sections).map(sectionName => {
          const section = sections[sectionName];
          return (
            <div key={sectionName} className="SectionRow">
              {Array.from({ length: section.rows }, (_, rowIndex) => {
                return (
                  <div className="Row" key={`${sectionName}-row-${rowIndex}`}>
                    {Array.from({ length: section.columns }, (_, columnIndex) => {
                      const seatId = `${sectionName[0].toUpperCase()}${rowIndex + 1}${columnIndex + 1}`;
                      return (
                        <div
                          key={seatId}
                          className={`Seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                          onClick={() => selectSeat(seatId)}
                        >
                          {seatId}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div className="Shopping-cart">
        <h3>Shopping Cart</h3>
        <ul>
          {selectedSeats.map(seatId => (
            <li key={seatId}>{seatId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
  
};

export default CustomerPurchase;
