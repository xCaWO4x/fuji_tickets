import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './venueLogin.css'
const Login = () => {
    // const [venueID, setVenueID] = useState('');
    // const url = "https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class"
    const type = 'VenueManager'
    const [credentials, setCredentials] = useState('')
    var data = {type:type, credentials:credentials}
    const navigate = useNavigate()
    
    const handleLogin = async () => {
        try {
          let payload = {
            method: 'POST',
            mode: 'cors', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          }
          console.log(payload)
          const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/login', payload);
          const answer = await response.json();
          const status = answer["statusCode"]
          // const responseBody = answer["body"]
    
          if (status === 400) {
            console.error('Authentication failed')
            // console.log(answer)
          }
          else {
            navigate('/createVenue')
          }
        } 
        catch (error) {
          console.error('Error during authentication:', error);
        }
      };

      // This is handler event for create venue
    const handleCreateVenue = () => {
      navigate("/createVenue")
    }
  
    return (
      <div>
        <h2 className = "venueLoginHeader">Venue Manager Login</h2>
        <label className='venueText'>Password: </label>
        <input className= 'inputBox' type="password" value={credentials} onChange={(e) => setCredentials(e.target.value)} />
        
        <button className = "venueLoginButton" type="submit" onClick={handleLogin}>Login</button>
        <button className = "venueCreateButton" onClick={handleCreateVenue}>Do not have a venue? Create venue</button>
      </div>
    
    )
  }
  
  export default Login;