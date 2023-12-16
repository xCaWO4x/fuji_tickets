import React, { useState, useEffect } from 'react';
import './customerPurchase.css';
import { useNavigate, useParams } from 'react-router-dom';

const CustomerPurchase = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const showName = useParams();
  const [sections, setSections] = useState([
    { sectionName: 'left', numRows: 3, numCol: 3 },
    { sectionName: 'center', numRows: 3, numCol: 2 },
    { sectionName: 'right', numRows: 3, numCol: 4 },
  ]);

  const [purchasedSeats, setPurchasedSeats] = useState([]); // Placeholder for purchased seats

  var data = {seats: selectedSeats}
  
  // Function to calculate total cost of selected seats
  const calculateTotalCost = () => {
    return selectedSeats.reduce((total, seat) => {
      // Find the section for the current seat
      const section = sections.find(s => s.sectionName === seat.section);
  
      if (section && Array.isArray(section.seats)) {
        // Find the specific seat in the section
        const seatDetails = section.seats.find(s => s.row === seat.row && s.col === seat.col);
  
        if (seatDetails) {
          return total + seatDetails.price;
        }
      }
  
      return total;
    }, 0);
  };

  useEffect(() => {
    if (showName) {
      fetchAvailableSeats();
    } else {
      console.error("Show name is undefined");
    }
  }, [showName]);

  // Function to fetch available seats
  const fetchAvailableSeats = async () => {
    try {
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/showAvailableSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(showName),
      });
  
      const jsonResponse = await response.json();
  
      if (response.status === 200 && jsonResponse && Array.isArray(jsonResponse.seats)) {
        let newSections = {};
        console.log(jsonResponse.seats)
        jsonResponse.seats.forEach(seat => {
          const { section, row, col, purchased, price } = seat;
  
          if (!newSections[section]) {
            newSections[section] = { sectionName: section, numRows: 0, numCol: 0, seats: [] };
          }
  
          newSections[section].numRows = Math.max(newSections[section].numRows, row.charCodeAt(0) - 'A'.charCodeAt(0) + 1);
          newSections[section].numCol = Math.max(newSections[section].numCol, col);
  
          newSections[section].seats.push({ ...seat, purchased: purchased === 1, price });
        });
  
        setSections(Object.values(newSections).map(section => ({
          ...section,
          seats: section.seats.sort((a, b) => a.row.localeCompare(b.row) || a.col - b.col)
        })));
  
        setPurchasedSeats(jsonResponse.seats.filter(seat => seat.purchased === 1).map(seat => seat.seatID));
      } else {
        console.error('Error fetching seats:', jsonResponse);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  
  // Function to handle purchase
  const handlePurchase = async () => {
    try {
      const actualShowName = showName.showName;
      let payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          showName: actualShowName,
          seats: selectedSeats.map(({ section, row, col }) => ({ section, row, col })),
        }),
      };
      console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/purchaseSeats', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
  
      if (status === 400) {
        console.error('Invalid Selection')
        console.log(payload.body)
        alert('Seat(s) already selected or show has passed.')
      } else {
        // Popup message indicating purchase success
        alert('Seat(s) have been purchased');
        
        // Updating the 'purchased' attribute of selected seats
        const updatedSections = sections.map(section => {
          const updatedSeats = section.seats.map(seat => {
            if (selectedSeats.some(selectedSeat => selectedSeat.seatId === seat.seatId)) {
              return { ...seat, purchased: 1 };
            }
            return seat;
          });
          return { ...section, seats: updatedSeats };
        });
        setSections(updatedSections);
  
        // Navigate to customer page
        navigate('/customerPage');
        console.log('Seat(s) have been purchased')
      }
    }
    catch (error) {
      console.error('Error during authentication:', error)
    }
  }


  const selectSeat = (seat) => {
    // Updated to receive entire seat object
    if (seat.purchased) {
      return; // Do nothing if the seat is already purchased
    }
    const seatId = seat.seatID;
    setSelectedSeats((prevSelectedSeats) => {
      if (prevSelectedSeats.some(s => s.seatID === seatId)) {
        // If already selected, remove from the array
        return prevSelectedSeats.filter((s) => s.seatID !== seatId);
      } else {
        // If not selected, add to the array
        return [...prevSelectedSeats, seat];
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
            const { row, col, price, purchased, seatID } = seat;
            const seatLabel = `${row}${col}: $${price}`; // Construct the seat label
            const isPurchased = purchased === 1;
            const isSelected = selectedSeats.some(selectedSeat => selectedSeat.seatID === seatID);
            return (
              <div
                className={`Seat ${isSelected ? 'selected' : ''} ${isPurchased ? 'purchased' : ''}`}
                key={seat.seatID}
                onClick={!isPurchased ? () => selectSeat(seat) : undefined}
              >
                {seatLabel}
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
          {selectedSeats.map(seat => (
            <li key={seat.seatID}>{`Section: ${seat.section}, Row: ${seat.row}, Col: ${seat.col}`}</li>
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