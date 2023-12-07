import React, { useState, useContext, useEffect} from 'react';
import './venuePage.css';
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueContext } from '../App'; // Import contexts from App
import CreateShowReports from '../controller/CreateShowReports';

const VenuePage = () => {
  const { currentPassword } = useContext(CurrentPasswordContext);
  const { currentVenue } = useContext(CurrentVenueContext);

  var data = {credentials: currentPassword}
  
  // Placeholder data for shows
  const shows = [
    { id: 1, name: "Show 1" },
    { id: 2, name: "Show 2" },
    // Add more shows as needed
  ];
  
  // change the payload to venueID
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
  }, [currentPassword, currentVenue])

  const handleCreateShow = () => {
    navigate("/createShow")
  }

  const venueName = "Venue Name"; // Placeholder for venue name

  const handleGenerateReportClick = () => {
    navigate("/report"); // Navigate to the CreateShowsReport component
  };

  const navigate = useNavigate();

  return (
    <div className="show-manager">
      <div className="venue-header">
      <h2>{currentVenue}</h2> {/* Display the current venue name */}
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
      <button onClick={handleGenerateReportClick} className="button">Generate Show Report</button>

    </div>
  );
};

export default VenuePage;
