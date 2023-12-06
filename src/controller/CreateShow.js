import React, { useState, useContext} from 'react';
import './CreateShow.css'; 
import '../boundary/venuePage.js'
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext } from '../App';

const CreateShow = ({ venueSections }) => {
  // State for the show name, date, and time
  const [showDetails, setShowDetails] = useState({
    name: '',
    date: '',
    time: ''
  }); 

  // var data is what information that client to send to the sever (FETCH API)
  // var data = {date: date, name: name,...}


  // Handler for input changes
  const handleInputChange = (type, value) => {
    setShowDetails(prevDetails => ({
      ...prevDetails,
      [type]: value
    }));
  };




  // Placeholder function for creating the show
  const createShow = async () => {
    // try {
    //   let payload = {
    //     method: 'POST',
    //     mode: 'cors', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data),
    //   }
    //   console.log(payload)
    //   const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/createShow', payload);
    //   const answer = await response.json();
    //   const status = answer["statusCode"]
      
    //   if (status === 400) {
    //     console.error('Authentication failed')
    //   } else {
    //     // navigate('/venuePage')   //do we need to navigate after this?? Or display a message ?
    //     console.log("Show has been created!")
    //   }
    // } 
    // catch (error){
    //   console.error('Error during authentication:', error)
    // }
   
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