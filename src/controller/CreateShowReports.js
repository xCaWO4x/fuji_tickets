import React, { useState, useEffect } from 'react';
import './CreateShowReports.css'; // Make sure to create this CSS file

const CreateShowReports = () => {
  const [shows, setShows] = useState([]); // State to store shows data

  useEffect(() => {
    // Perform the API call when the component mounts
    fetchShowsData();
  }, []);

  const fetchShowsData = async () => {
    const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/generateShowReport');
    const data = await response.json();
    if (data.statusCode === 200) {
      setShows(data.body); // Update the state with the fetched shows data
    } else {
      // Handle any errors or unsuccessful responses here
      console.error('Failed to fetch shows data');
    }
  };

  // Placeholder for the actual API data
  const placeholderData = [
    { id: 1, name: "Show Name 1", status: "Active", blockPrices: "10, 15, 20", seatsSold: 69, seatsRemaining: 21, totalRevenue: 8760 },
    { id: 2, name: "Show Name 2", status: "Inactive", blockPrices: "10, 15, 20", seatsSold: 0, seatsRemaining: 100, totalRevenue: 0 },
    // Add more placeholder data as needed
  ];

  return (
    <div className="show-report-container">
      <h1>Show Report</h1>
      {placeholderData.map(show => ( // Replace placeholderData with shows once API is integrated
        <div key={show.id} className="show-report-card">
          <div className="show-report-header">
            <h2>{show.name}</h2>
            <span className="show-report-status">{show.status}</span>
          </div>
          <div className="show-report-details">
            <p>Block Prices: ${show.blockPrices}</p>
            <p>Seats Sold: {show.seatsSold}</p>
            <p>Seats Remaining: {show.seatsRemaining}</p>
            <p>Total Revenue: ${show.totalRevenue.toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CreateShowReports;
