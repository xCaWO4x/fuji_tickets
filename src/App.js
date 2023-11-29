import './App.css';
import React from 'react';
import CreateVenue from './controller/CreateVenue.js';


import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom" 
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './boundary/venueLogin.js'   //venue login
import AdminLogin from './boundary/adminLogin'
import AdminPage from './boundary/adminPage'
import Home from './boundary/Home.js'
// import navbar from './components/navbar';

// import Home from './Pages/Home'
// import Layout from './Pages/Layout'

// import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';



function App() {
  return (
    <div className="App">
       
      <BrowserRouter>
    
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

      </Routes>

   </BrowserRouter>
   </div>
  );
}

export default App;