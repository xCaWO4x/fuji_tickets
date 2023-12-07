import React, { useState } from 'react';
import './customerPurchase.css';
import { useNavigate } from 'react-router-dom';

const CustomerPurchase = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [price, setPrice] = useState(10); // Price per seat (placeholder)

  const [sections, setSections] = useState([
    { sectionName: 'left', numRows: 3, numCol: 3 },
    { sectionName: 'center', numRows: 3, numCol: 3 },
    { sectionName: 'right', numRows: 3, numCol: 3 },
  ]);

  var data = {seats: selectedSeats}

  const calculateTotalCost = () => {
    return selectedSeats.length * price;
  };

  const handlePurchase = async () => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
      console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/purchaseSeats', payload);
      const answer = await response.json();
      const status = answer["statusCode"]

      if (status === 400) {
        console.error('Invalid Selection')
        alert('Seat(s) already selected or show has passed.')
      } else {
        navigate('/customerPage')
        console.log('Seat(s) have been purchased')
      }
    }
    catch (error) {
      console.error('Error during authentication:', error)
    }
  }

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
    const maxRows = Math.max(...sections.map(section => section.numRows));

    let layout = [];
    const sectionLabels = (
      <div className="SectionLabels" key="section-labels">
        {sections.map(section => (
          <div className="SectionLabel" key={`${section.sectionName}-label`}>
            {section.sectionName.charAt(0).toUpperCase() + section.sectionName.slice(1)}
          </div>
        ))}
      </div>
    );
    layout.push(sectionLabels);

    for (let r = 0; r < maxRows; r++) {
      let rowSeats = [];
      for (let section of sections) {
        for (let c = 0; c < section.numCol; c++) {
          if (r < section.numRows) {
            // Change here: Convert row number to letter (A, B, C, ...)
            const rowLetter = String.fromCharCode('A'.charCodeAt(0) + r);
            const seatId = `${section.sectionName[0].toUpperCase()}${rowLetter}${c + 1}`;
    
            rowSeats.push(
              <div
                className={`Seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                key={seatId}
                onClick={() => selectSeat(seatId)}
              >
                {seatId}
              </div>
            );
          } else {
            // Add placeholder for invisible seats
            rowSeats.push(<div className="Seat Invisible" key={`${section.sectionName}-seat-${r}-${c}`}></div>);
          }
        }
      }
    
      // Create a new row element for the current row of seats
      const rowElement = (
        <div className="Row" key={`row-${r}`}>
          {rowSeats}
        </div>
      );
      layout.push(rowElement);
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
        <h3>Shopping Cart</h3>
        <ul>
          {selectedSeats.map(seatId => (
            <li key={seatId}>{seatId}</li>
          ))}
        </ul>
        <div className="Total-cost">
          <span>Total Cost: ${calculateTotalCost()}</span>
          <button onClick={handlePurchase}>Check Out</button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPurchase;
