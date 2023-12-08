import './App.css';
import React from 'react';
import CreateVenue from './controller/CreateVenue.js';
import CreateShow from './controller/CreateShow.js';
import CreateShowsReport from './controller/CreateShowReports.js';
import { createContext, useContext, useState } from 'react';
import ReactDOM from "react-dom/client"
import { HashRouter, Routes, Route } from "react-router-dom" 
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './boundary/venueLogin.js';
import VenuePage from './boundary/venuePage'; 

import AdminLogin from './boundary/adminLogin'
import AdminPage from './boundary/adminPage'

import CustomerPage from './boundary/customerPage'
import CustomerPurchase from './boundary/customerPurchase'

import Home from './boundary/Home.js'
// import navbar from './components/navbar';

// import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';

export const CurrentPasswordContext = createContext(null);
export const CurrentVenueIDContext = createContext(null);
function App() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [currentVenueID, setCurrentVenueID] = useState('');

  return (
    <div className="App">
      <CurrentPasswordContext.Provider value={{currentPassword, setCurrentPassword}}> 
      <CurrentVenueIDContext.Provider value={{currentVenueID, setCurrentVenueID}}>

      <HashRouter>
    
      {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/venueLogin">Venue Login/Create</Link>
          <Link to="/adminLogin">Admin Login</Link>
      </nav> */}

        {/* <navbar />    */}
        <Routes>
            <Route path="/" element = {<Home />} />
            <Route path="/venueLogin" element={<Login/>} />
            <Route path="/adminLogin" element={<AdminLogin/>} />
            <Route path="/createVenue" element={<CreateVenue/>} />
            <Route path="/adminPage" element={<AdminPage/>} />
            <Route path="/createShow" element={<CreateShow/>} />
            <Route path="/venuePage" element={<VenuePage/>} />
            <Route path="/customerPage" element={<CustomerPage/>} />
            <Route path="/customerPurchase" element={<CustomerPurchase/>} />
            <Route path="/report" element={<CreateShowsReport />} />
        </Routes>

   </HashRouter>
   </CurrentVenueIDContext.Provider>
   </CurrentPasswordContext.Provider>
   </div>
  );
}

export default App;




  // const handleLogin = async () => {
    //   try {
    //     const response = await fetch('your-authentication-endpoint', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ username, password }),
    //     });
  
    //     if (!response.ok) {
    //       // Handle authentication error, e.g., show an error message to the user
    //       console.error('Authentication failed');
    //       return;
    //     }
  
    //     // Assuming the server responds with a token upon successful authentication
    //     const data = await response.json();
    //     const authToken = data.token;
  
    //     // Now you can store the authToken in your application state or in a cookie
    //     // Redirect the user or perform other actions as needed
    //   } catch (error) {
    //     console.error('Error during authentication:', error);
    //   }
    // };
    //   // return null console.log('Authentication:', credentials)
    //   // navigate("/venueLogin")
