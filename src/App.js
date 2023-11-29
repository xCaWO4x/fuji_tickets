import './App.css';
import React from 'react';
import CreateVenue from './controller/CreateVenue.js';


import ReactDOM from "react-dom/client"
// import { BrowserRouter, Routes, Route } from "react-router-dom" 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './boundary/venueLogin.js'   //venue login
// import Home from './Pages/Home'
// import Layout from './Pages/Layout'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Seats4u</h1>
      </header>
      <main>
        <Login/>
        <CreateVenue />
      </main>
    </div>
  );
}

export default App;