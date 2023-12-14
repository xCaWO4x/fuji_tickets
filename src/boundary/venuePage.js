import React, { useState, useContext, useEffect} from 'react';
import './venuePage.css';
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext, CurrentVenueIDContext, CurrentShowIDContext } from '../App';
import CreateShowReports from '../controller/CreateShowReports';
import CreateShow from '../controller/CreateShow';
import ManageBlock from '../controller/ManageBlock'; 

const VenuePage = () => {
  // const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
  const {currentVenueID, setCurrentVenueID} = useContext(CurrentVenueIDContext);
  const {currentShowID, setCurrentShowID} = useContext(CurrentShowIDContext);

  const [shows, setShows] = useState([]);
  // var id = {showID: show.showID}

  var data = {venueID: currentVenueID.venueID}
  console.log(data)
  // const [showList, setShowList] = useState([]);
  // how to get show name from database
  // var deleteShowName = {name: shows.name}
  // console.log(currentVenueID)
  // console.log(data);
  // console.log(showList)

  // var data = {credentials: currentPassword}
  // Placeholder data for shows

  // get shows from API

  

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
        console.log(responseBody)
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

  const handleManageBlocks = (showID) => {
    setCurrentShowID(showID); 
    navigate("/manageBlocks"); 
};

  const handleDeleteShow = async (event) => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({showID: event.target.className})
      }
      // console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/deleteShow', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["data"]

      if (status === 400) {
        console.error(responseBody)
      } else {
        console.log(responseBody)
        post()

      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  // var data = {showID: id}
  const handleActivateShow = async (event) =>{
    try {
        let payload = {
          method: 'POST',
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({showID: event.target.className})
        }
        //console.log(payload)
        // console.log(event.target)
        const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/activateShow', payload);
        const answer = await response.json();
        const status = answer["statusCode"]
        const responseBody = answer["data"]
        if (status === 400) {
          console.error(responseBody)
        } else {
          console.log(responseBody)
        }
      } 
      catch (error) {
        console.error('Error during authentication:', error);
      }
  }  

  const venueName = "Venue Name"; // Placeholder for venue name

  const handleGenerateReportClick = () => {
    navigate("/report"); // Navigate to the CreateShowsReport component
  };

  const navigate = useNavigate();

  return (
    <div className="show-manager">
      <div className="venue-header">
      <h2>{currentVenueID.venueName}</h2> {/* Display the current venue name */}
      </div>
      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.showID} className="show">
            <span className="show-name">{show.name}</span>
            <button onClick={handleDeleteShow} className={show.showID}>Delete Show</button>
            <button onClick={() => handleManageBlocks(show.showID)}>Manage Blocks</button>
            <button onClick={handleActivateShow} className={show.showID}>Activate</button>
          </div>
        ))}
      </div>
      <button onClick={handleCreateShow}>Create Show</button>
      <button onClick={handleGenerateReportClick} className="button">Generate Show Report</button>

    </div>
  );
};

export default VenuePage;
