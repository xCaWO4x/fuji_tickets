import React, { useState, useContext, useEffect} from 'react';
import './venuePage.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext } from '../App';
import CreateShow from '../controller/CreateShow';

const VenuePage = () => {
  const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
  var data = {credentials: currentPassword}
  
  // Placeholder data for shows
  const shows = [
    { id: 1, name: "Show 1" },
    { id: 2, name: "Show 2" },
    // Add more shows as needed
  ];

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
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listShows', payload);
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

  const handleCreateShow = () => {
    navigate("/createShow")
  }

  const venueName = "Venue Name"; // Placeholder for venue name

  const navigate = useNavigate();

  return (
    <div className="show-manager">
      <div className="venue-header">
        <h2>{venueName}</h2>
      </div>
      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.id} className="show">
            <span className="show-name">{show.name}</span>
            <button className="button">Delete Show</button>
            <button className="button">Manage Blocks</button>
            <button className="button">Activate</button>
          </div>
        ))}
      </div>
      <button onClick={handleCreateShow}>Create Show</button>
    </div>
  );
};

export default VenuePage;
