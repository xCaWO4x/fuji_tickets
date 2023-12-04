import './App.css';
import React from 'react';
import CreateVenue from './controller/CreateVenue.js';
import CreateShow from './controller/CreateShow.js';

import ReactDOM from "react-dom/client"
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom" 
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Login from './boundary/venueLogin.js';
import VenuePage from './boundary/venuePage'; 

import AdminLogin from './boundary/adminLogin'
import AdminPage from './boundary/adminPage'

import CustomerPage from './boundary/customerPage'

import Home from './boundary/Home.js'
// import navbar from './components/navbar';

// import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
       
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
      </Routes>

   </HashRouter>
   </div>
  );
}

export default App;