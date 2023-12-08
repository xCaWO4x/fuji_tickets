import React, { useState } from 'react';
import './CreateShow.css'; 
import { useNavigate } from 'react-router-dom';

const CreateShow = ({ venueSections }) => {
  const [showDetails, setShowDetails] = useState({
    name: '',
    venueName: '',
    startDate: ''
  }); 
  const [price, setPrice] = useState('');

  const navigate = useNavigate();

  const handleInputChange = (type, value) => {
    setShowDetails(prevDetails => ({
      ...prevDetails,
      [type]: value
    }));
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const createShow = async () => {
    // Assume combining date and time into a single ISO string for startDate
    var data = {
      name: showDetails.name,
      venueName: showDetails.venueName,
      startDate: showDetails.startDate,
      price: parseFloat(price).toFixed(2)
    }
    // Rest of the createShow function remains the same
    // ...
  };

  return (
    <div className="CreateShow">
      <div className="Show-name-section">
        <label>Show name:</label>
        <input
          type="text"
          placeholder="Enter show name"
          value={showDetails.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          className="Show-input"
        />
      </div>
      <div className="Venue-name-section">
        <label>Venue name:</label>
        <input
          type="text"
          placeholder="Enter venue name"
          value={showDetails.venueName}
          onChange={(e) => handleInputChange('venueName', e.target.value)}
          className="Venue-input"
        />
      </div>
      <div className="DateTime-section">
        <label>Date and Time:</label>
        <input
          type="datetime-local"
          value={showDetails.startDate}
          onChange={(e) => handleInputChange('startDate', e.target.value)}
          className="DateTime-input"
        />
      </div>
      <div className="Price-section">
        <label>Price per seat:</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={handlePriceChange}
          className="Price-input"
        />
      </div>
      <button className="Create-button" onClick={createShow}>Create Show</button>
      <div className="Seating-layout">
        {/* Render the seating layout passed as a prop */}
        {venueSections}
      </div>
    </div>
  );
};

export default CreateShow;
