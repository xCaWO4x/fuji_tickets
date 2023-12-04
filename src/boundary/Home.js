import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

    // const handleLogin = () => {
    //   // Logic goes here
    //   console.log('Logging in with:', venueID, credentials);
    // };
    const navigate = useNavigate() 

    const handlevenueLogin = () => {
      navigate('/venueLogin')
    }

    const handleadminLogin = () => {
      navigate('/adminLogin')
    }

    const handleCustomerPage = () => {
      navigate('/customerPage')
    }

    return (
      <div>
        <h2>Home Page</h2>
        <button onClick={handleCustomerPage}>Customer Page</button>
        <button onClick={handlevenueLogin}>Venue Login/Create</button>
        <button onClick={handleadminLogin}>Admin Login</button> 
      </div>
    )
  }
  
  export default Home;