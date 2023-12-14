import React from 'react';
import { useState, useContext} from 'react';
import './customerPage.css'; // Make sure to create this CSS file
import { useNavigate } from 'react-router-dom';

const CustomerPage = () => {
 // Placeholder data for active shows with available seats
//  const activeShows = [
//     { id: 1, name: "Active Show 1", seatsAvailable: 120 },
//     { id: 2, name: "Active Show 2", seatsAvailable: 85 },
//     // more active shows...
//   ];

  const [activeShows, setActiveShows] = useState([]); 
  const [searchShow, setSearchShow] = useState('');
  // console.log(searchShow)
  var data = {searchString: searchShow}
  
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
      //console.log(payload)
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
      let payload = {
        method: 'GET',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        }
      }
      //console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listActiveShows', payload);
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


  const handleCustomerPurchase = () => {
    navigate("/customerPurchase")
  }

  const navigate = useNavigate();

  return (
    <div className="customer-view">
      <div className="search-bar">
        <input type="text" value={searchShow} placeholder="Search Shows..." onChange={(e) => setSearchShow(e.target.value)}/>
        {/* need to fix button for searchShow */}
        <button onClick={handleSearchShow} className="purchase-button" >Search</button> 
        <button onClick={handleListActiveShows}>List All Active Shows</button> 
      </div>
      <div className="shows-table">
        {activeShows.map((show) => (
          <div key={show.showID} className="show-row"> 
            <div className="show-cell show-name">{show.name}</div>
            {/* what is seatAvailable in our data schema? show.numSeats */}
            <div className="show-cell seats-available">Seats: {show.numSeats}</div>
            <div className="show-cell purchase-button-cell">
              <button onClick={handleCustomerPurchase} className="purchase-button" >Purchase Tickets</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerPage;
