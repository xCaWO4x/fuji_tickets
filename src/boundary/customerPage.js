import React from 'react';
import './customerPage.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
 // Placeholder data for active shows with available seats
 const activeShows = [
    { id: 1, name: "Active Show 1", seatsAvailable: 120 },
    { id: 2, name: "Active Show 2", seatsAvailable: 85 },
    // more active shows...
  ];

  const handleCustomerPurchase = () => {
    navigate("/customerPurchase")
  }

  const navigate = useNavigate();

  return (
    <div className="customer-view">
      <div className="search-bar">
        <input type="text" placeholder="Search Shows..." />
      </div>
      <div className="shows-table">
        {activeShows.map((show) => (
          <div key={show.id} className="show-row">
            <div className="show-cell show-name">{show.name}</div>
            <div className="show-cell seats-available">Seats: {show.seatsAvailable}</div>
            <div className="show-cell purchase-button-cell">
              <button onClick={handleCustomerPurchase} className="purchase-button" >Purchase Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
