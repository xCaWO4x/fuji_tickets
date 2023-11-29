import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './venueLogin.css'
const Login = () => {
    // const [venueID, setVenueID] = useState('');
    const [credentials, setCredentials] = useState('')
    const navigate = useNavigate();
  
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
    

    const handleCreateVenue = () => {
      navigate("/createVenue")
    }
  
    return (
      <div>
        <h2 className = "venueLoginHeader">Venue Manager Login</h2>
        <label className='venueText'>Password: </label>
        <input type="password" value={credentials} onChange={(e) => setCredentials(e.target.value)} />
        
        {/* <button className = "venueLoginButton" type="submit" onClick={handleLogin}>Login</button> */}
        <button className = "venueCreateButton" onClick={handleCreateVenue}>Do not have a venue? Create venue</button>
      </div>
    
    )
  }
  
  export default Login;