// import logo from './logo.svg';
import './App.css'
import React from 'react'
import ReactDOM from "react-dom/client"
// import { BrowserRouter, Routes, Route } from "react-router-dom" 
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './Pages/venueLogin'   //venue login
// import Home from './Pages/Home'
// import Layout from './Pages/Layout'


function App() {
  return (
    <Login/>
  )
}

export default App;
