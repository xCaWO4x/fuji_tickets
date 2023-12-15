import React, { useState, useEffect } from 'react';
import './customerPurchase.css';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerPurchase = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const showName = useParams();
  const [sections, setSections] = useState([
    { sectionName: 'left', numRows: 3, numCol: 3 },
    { sectionName: 'center', numRows: 3, numCol: 3 },
    { sectionName: 'right', numRows: 3, numCol: 3 },
  ]);

  const [purchasedSeats, setPurchasedSeats] = useState([]); // Placeholder for purchased seats

  var data = {seats: selectedSeats}

  const calculateTotalCost = () => {
    return selectedSeats.reduce((total, seatId) => {
      const seat = sections.find(section => section.seats.some(s => s.seatID === seatId))
                           .seats.find(s => s.seatID === seatId);
      return total + seat.price;
    }, 0);
  };

  useEffect(() => {
    if (showName) {
      fetchAvailableSeats();
    } else {
      console.error("Show name is undefined");
    }
  }, [showName]);

  const fetchAvailableSeats = async () => {
  
    try {
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/showAvailableSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showName), // Assuming the API expects a showId in the body
      });
  
      const jsonResponse = await response.json();
  
      let newSections = {};
      console.log(jsonResponse.seats);

      jsonResponse.seats.forEach(seat => {
        const { section, row, col, purchased, price } = seat; // include price here

        if (response.status === 200 && jsonResponse && Array.isArray(jsonResponse.seats)) {
          let newSections = {};
          jsonResponse.seats.forEach(seat => {
            const { section, row, col, purchased, price } = seat; // include price here
    
            if (!newSections[section]) {
              newSections[section] = { sectionName: section, numRows: 0, numCol: 0, seats: [] };
            }
    
            // Update number of rows and columns
            newSections[section].numRows = Math.max(newSections[section].numRows, row.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
            newSections[section].numCol = Math.max(newSections[section].numCol, col);
    
            // Add seat data to the section, including the price
            newSections[section].seats.push({ ...seat, purchased: purchased === 1, price }); // include price here
          });
    
          setSections(Object.values(newSections).map(section => ({
            ...section,
            seats: section.seats.sort((a, b) => a.row.localeCompare(b.row) || a.col - b.col)
          })));
        setPurchasedSeats(jsonResponse.seats.filter(seat => seat.purchased === 1).map(seat => seat.seatID));
      } else {
        console.error('Error fetching seats:', jsonResponse);
      }
    })} catch (error) {
      console.error('Error:', error);
    }
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
    if (purchasedSeats.includes(seatId)) {
      // Do nothing if the seat is purchased
      return;
    }
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
    layout.push(
      <div className="SectionLabels" key="section-labels">
        {sections.map(section => (
          <div className="SectionLabel" key={`${section.sectionName}-label`}>
            {section.sectionName.charAt(0).toUpperCase() + section.sectionName.slice(1)}
          </div>
        ))}
      </div>
    );
  
    for (let r = 0; r < maxRows; r++) {
      let rowSeats = sections.flatMap(section => {
        if (!Array.isArray(section.seats)) {
          return []; // Return an empty array if seats are not defined or not an array
        }
        return section.seats.filter(seat => seat.row.charCodeAt(0) - 'A'.charCodeAt(0) === r)
          .sort((a, b) => a.col - b.col)
          .map(seat => {
            const { row, col, price, purchased } = seat;
            const seatLabel = `${row}${col}: $${price}`; // Construct the seat label
            const seatId = seat.seatID; // Keep seatID for selection purposes
            const isPurchased = purchased === 1;
            return (
              <div
                className={`Seat ${selectedSeats.includes(seatId) ? 'selected' : ''} ${isPurchased ? 'purchased' : ''}`}
                key={seatId}
                onClick={!isPurchased ? () => selectSeat(seatId) : undefined}
              >
                {seatLabel} {/* Display the formatted label */}
              </div>
            );
          });
      });
  
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
}
export default CustomerPurchase;
