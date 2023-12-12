import React, { useState, useEffect, useContext } from 'react';
import './CreateShowReports.css'; // Make sure to create this CSS file
import { CurrentPasswordContext, CurrentVenueIDContext} from '../App';


const CreateShowReports = () => {
  const [shows, setShows] = useState([]); // State to store shows data
  const {currentVenueID, setCurrentVenueID} = useContext(CurrentVenueIDContext);

  var data = {venueID: currentVenueID.venueID}
  useEffect(() => {
    // Perform the API call when the component mounts
    fetchShowsData();
  }, []);

  const fetchShowsData = async () => {
    // const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/generateShowReport');
    // const data = await response.json();
    // if (data.statusCode === 200) {
    //   setShows(data.body); // Update the state with the fetched shows data
    // } else {
    //   // Handle any errors or unsuccessful responses here
    //   console.error('Failed to fetch shows data');
    // }
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
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/generateShowReports', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["data"]

      if (status === 400) {
        console.error(responseBody)

      } else {
        console.log(responseBody)
        setShows(answer.data)
      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="show-report-container">
      <h1>Show Report</h1>
      {shows.map(show => (
        <div key={show.showID} className="show-report-card">
          <div className="show-report-header">
            <h2>{show.name}</h2>
            <span className="show-report-status">{show.active ? 'Active' : 'Inactive'}</span>
          </div>
          <div className="show-report-details">
            {/* Render the actual show details here */}
            {/* Example: <p>Seats Sold: {show.seatsSold}</p> */}
            {/* Add more details as per your API response */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateShowReports;
