import React, { useState, useContext} from 'react';
import './venuePage.css'; // Import CSS file for styling
import { useNavigate } from 'react-router-dom';
import { CurrentPasswordContext } from '../App';

const VenuePage = () => {
  // Placeholder data for shows
  const shows = [
    { id: 1, name: "Show 1" },
    { id: 2, name: "Show 2" },
    // Add more shows as needed
  ];

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
      <button className="create-show-button">Create Show</button>
    </div>
  );
};

export default VenuePage;
