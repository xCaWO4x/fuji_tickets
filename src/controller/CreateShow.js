import React, { useState, useContext} from 'react';
import './CreateShow.css'; 
import '../boundary/venuePage.js'
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueIDContext } from '../App';

const CreateShow = ({ venueSections }) => {
  
  const [showDetails, setShowDetails] = useState({
    name: '',
    venueName: '',
    startDate: ''
  }); 

  const { currentVenueID, setCurrentVenueID } = useContext(CurrentVenueIDContext);

  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  var data = {name: showDetails.name, venueID: currentVenueID.venueID, startDate:showDetails.startDate, price: parseFloat(price).toFixed(2)}

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
    try {
      let payload = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      //console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/createShow', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["data"]

      if (status === 400) {
        console.error(responseBody)
      } else {
        console.log(answer)
        navigate('/venuePage')
      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
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