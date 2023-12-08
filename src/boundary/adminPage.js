import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { CurrentPasswordContext, CurrentVenueIDContext } from '../App'; // Import CurrentVenueIDContext

const AdminPage = () => {
  const { currentPassword } = useContext(CurrentPasswordContext);
  const { setCurrentVenueID } = useContext(CurrentVenueIDContext); // Use CurrentVenueIDContext
  const [venues, setVenues] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleDeleteVenue = async (venueID) => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ venueID, credentials: currentPassword })
      };
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/deleteVenue', payload);
      const result = await response.json();

      if (result.statusCode === 200) {
        console.log('Venue deleted successfully');
        fetchVenues(); // Refetch the venues to update the list
      } else {
        console.error('Error deleting venue');
      }
    } catch (error) {
      console.error('Error during deleting venue:', error);
    }
  };

  const fetchVenues = async () => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ credentials: currentPassword })
      };
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listVenues', payload);
      const result = await response.json();

      if (result.statusCode === 200) {
        setVenues(result.data); // Set the venues data
      } else {
        console.error('Error fetching venues');
      }
    } catch (error) {
      console.error('Error during fetching venues:', error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const handleViewVenue = (venue) => {
    setCurrentVenueID(venue); // Set current venue ID
    navigate('/venuePage'); // Navigate to VenuePage
  };

  return (
    <div className="AdminPage">
      <h1>Venue List</h1>
      {venues.map((venue, index) => (
        <div key={index} className="venue-item">
          <span>{venue.name}</span>
          <button onClick={() => handleViewVenue(venue)}>View Venue</button>
          <button onClick={() => handleDeleteVenue(venue.venueID)}>Delete Venue</button>

        </div>
      ))}
    </div>
  );
};

export default AdminPage;
