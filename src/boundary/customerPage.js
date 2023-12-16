import React from 'react';
import { useState, useContext} from 'react';
import './customerPage.css'; 
import { useNavigate, useParams } from 'react-router-dom';

const CustomerPage = () => {
  const [activeShows, setActiveShows] = useState([]); 
  const [searchShow, setSearchShow] = useState('');
  const [searchVenue, setSearchVenue] = useState([]);
  const { showName } = useParams();
  
  var data = {searchString: searchShow}
  
  const fetchAvailableSeats = async (showName) => {
    try {
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/showAvailableSeats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ showName }),
      });
      const jsonResponse = await response.json();

      if (response.status === 200 && jsonResponse && Array.isArray(jsonResponse.seats)) {
        return jsonResponse.seats.length;
      } else {
        console.error('Error fetching available seats:', jsonResponse);
        return 0;
      }
    } catch (error) {
      console.error('Error:', error);
      return 0;
    }
  };

  const handleSearchShow = async () => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/searchShows', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["data"]

      if (status === 400) {
        // console.log(answer);
        console.error(responseBody)
      } else {
        // setShows(responseBody)
        console.log(answer)
        setActiveShows(responseBody)
      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  const handleListActiveShows = async () => {
    try {
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listActiveShows', {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      const answer = await response.json();
      const status = answer["statusCode"]

      if (status === 200 && Array.isArray(answer["data"])) {
        const showsWithAvailableSeats = await Promise.all(answer["data"].map(async (show) => {
          const availableSeats = await fetchAvailableSeats(show.name);
          return { ...show, availableSeats };
        }));
        setActiveShows(showsWithAvailableSeats);
      } else {
        console.error('Error fetching active shows:', answer);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearchVenue = async () => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data) //data is searchShow
      }
      console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/searchVenues', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["data"]

      if (status === 400) {
        // console.log(answer);
        console.error(responseBody)
      } else {
        // setShows(responseBody)
        console.log(answer)
        setSearchVenue(responseBody.venues)
        // setActiveShows(responseBody)
        // setActiveShows(responseBody)
      }
    } catch (error) {
      console.error('Error during authentication:', error); 
    }
  }


  const handleCustomerPurchase = (selectedShowName) => {
    navigate(`/customerPurchase/${selectedShowName}`);
  }

  const navigate = useNavigate();

  return (
    <div className="customer-view">
      <div className="search-bar">
        <input type="text" value={searchShow} placeholder="Search Shows..." onChange={(e) => setSearchShow(e.target.value)}/>
        {/* need to fix button for searchShow */}
        <button onClick={handleSearchShow} className="purchase-button" >Search Shows</button> 
        <button onClick={handleSearchVenue}>Search Venues</button> 
        <button onClick={handleListActiveShows}>List All Active Shows</button> 
      </div>
      <div className="shows-table">
      {activeShows.map((show) => (
        <div key={show.showID} className="show-row"> 
          <div className="show-cell show-name">{show.name}</div>
          <div className="show-cell seats-available">Seats Available: {show.availableSeats}</div>
          <div className="show-cell purchase-button-cell">
            {show.availableSeats > 0 ? (
              <button onClick={() => handleCustomerPurchase(show.name)} className="purchase-button">
                Purchase Tickets
              </button>
            ) : (
              <button disabled className="sold-out-button">
                Sold Out
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
      <div className="venue-table">
        {searchVenue.map((venue) => (
          <div key={venue.venueID} className="venue-row"> 
            <div className="venue-cell venue-name">{venue.name}</div>
          </div>
        ))}
    </div>
    </div>
  );
};

export default CustomerPage;
