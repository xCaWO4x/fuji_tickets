import React, { useEffect, useContext, useState} from 'react';
import './adminPage.css'; 
import { CurrentPasswordContext } from '../App';

const AdminPage = () => {
  const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
  // const type = "VenueManager"
  const [venues, setVenues] = useState([
    { name: 'Venue 1', credentials: 'Credentials 1', layouts: [{ sectionName: 'left', numRows: 10, numCol: 20 }, /*... other sections */] },
    { name: 'Venue 2', credentials: 'Credentials 2', layouts: [{ sectionName: 'center', numRows: 15, numCol: 25 }, /*... other sections */] },
    // ... add more venues as needed
  ]);
  var data = {credentials: currentPassword}

// LAMBDA function for list venue is a POST method 

  const post = async () => {
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
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listVenues', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["body"]

      if (status === 400) {
        console.error('Error!')
      } else {
        console.log(answer)
      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  useEffect(() => {
    post();
  }, [])
    
    const handleClick = () => {
      // return null console.log('Authentication:', credentials)
      return null
    }
  
  const handleViewVenue = (venueName) => {
    console.log(`View details for ${venueName}`);
    // Implement navigation or modal to show venue details
  };
    return (
    <div className="AdminPage">
      <h1>Venue List</h1>
      {venues.map((venue, index) => (
        <div key={index} className="venue-item">
          <span>{venue.name}</span>
          <button onClick={() => handleViewVenue(venue.name)}>View Venue</button>
      </div>
      ))}
    </div>
  );
};
  
  export default AdminPage;