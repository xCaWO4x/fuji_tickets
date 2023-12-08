import React, { useState, useContext, useEffect} from 'react';
import './venuePage.css';
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueIDContext} from '../App';
import CreateShowReports from '../controller/CreateShowReports';
import CreateShow from '../controller/CreateShow';

const VenuePage = () => {
  // const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
  const {currentVenueID, setCurrentVenueID} = useContext(CurrentVenueIDContext);
  const [shows, setShows] = useState([]);

  var data = {venueID: currentVenueID}
  // how to get show name from database
  // var deleteShowName = {name: shows.name}
  
  console.log(data);

  // var data = {credentials: currentPassword}
  // Placeholder data for shows

  
  
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
      const responseBody = answer["data"]

      if (status === 400) {
        // console.log(answer);
        console.error(responseBody)
      } else {
        setShows(responseBody)
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



  const handleDeleteShow = async () => {
    // try {
    //   let payload = {
    //     method: 'POST',
    //     mode: 'cors', 
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(deleteShowName)
    //   }
    //   //console.log(payload)
    //   const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/deleteShow', payload);
    //   const answer = await response.json();
    //   const status = answer["statusCode"]
    //   const responseBody = answer["data"]

    //   if (status === 400) {
    //     console.error(responseBody)
    //   } else {
    //     console.log(answer)
    //   }
    // } 
    // catch (error) {
    //   console.error('Error during authentication:', error);
    // }
  }

  const handleActivateShow = () =>{
    // try {
      //   let payload = {
      //     method: 'POST',
      //     mode: 'cors', 
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify(deleteShowName)
      //   }
      //   //console.log(payload)
      //   const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/activateShow', payload);
      //   const answer = await response.json();
      //   const status = answer["statusCode"]
      //   const responseBody = answer["data"]
  
      //   if (status === 400) {
      //     console.error(responseBody)
      //   } else {
      //     console.log(answer)
      //   }
      // } 
      // catch (error) {
      //   console.error('Error during authentication:', error);
      // }
  }  

  const venueName = "Venue Name"; // Placeholder for venue name

  const handleGenerateReportClick = () => {
    navigate("/report"); // Navigate to the CreateShowsReport component
  };

  const navigate = useNavigate();

  return (
    <div className="show-manager">
      <div className="venue-header">
      <h2>Display current venueName</h2> {/* Display the current venue name */}
      </div>
      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.showID} className="show">
            <span className="show-name">{show.name}</span>
            <button onClick ={handleDeleteShow} className="button">Delete Show</button>
            <button className="button">Manage Blocks</button>
            <button onClick = {handleActivateShow} className="button">Activate</button>
          </div>
        ))}
      </div>
      <button onClick={handleCreateShow}>Create Show</button>
      <button onClick={handleGenerateReportClick} className="button">Generate Show Report</button>

    </div>
  );
};

export default VenuePage;
