import React, { useState } from 'react';
import './CreateShow.css'; 
import '../boundary/venuePage.js'
import { useNavigate } from 'react-router-dom';

const CreateShow = ({ venueSections }) => {
  // State for the show name, date, and time
  const [showDetails, setShowDetails] = useState({
    name: '',
    date: '',
    time: ''
  });

  // Handler for input changes
  const handleInputChange = (type, value) => {
    setShowDetails(prevDetails => ({
      ...prevDetails,
      [type]: value
    }));
  };




  // Placeholder function for creating the show
  const createShow = () => {
    // Placeholder for now, this will be linked to the database later
    console.log('Show created with details:', showDetails, 'and venue sections:', venueSections);
    // Send this data to your backend server here
  };
  
    // handleVenuePage
    const handleVenuePage = () => {
      navigate("/venuePage")
    }
  

  const navigate = useNavigate();

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
      <div className="DateTime-section">
        <label>Date:</label>
        <input
          type="date"
          value={showDetails.date}
          onChange={(e) => handleInputChange('date', e.target.value)}
          className="Date-input"
        />
        <label>Time:</label>
        <input
          type="time"
          value={showDetails.time}
          onChange={(e) => handleInputChange('time', e.target.value)}
          className="Time-input"
        />
      </div>
      <button className="Create-button" onClick={createShow}>Create Show</button>
      <button onClick={handleVenuePage}>Enter Venue (Test, should be entered after creating venue)</button>

      <div className="Seating-layout">
        {/* Render the seating layout passed as a prop */}
        {venueSections}
      </div>
    </div>
  );
};

export default CreateShow;