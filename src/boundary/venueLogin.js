import React, { useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './venueLogin.css'
import { CurrentPasswordContext, CurrentVenueIDContext} from '../App';

const Login = () => {
    // const [venueID, setVenueID] = useState('');
    // const url = "https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class"
    const type = 'VenueManager'
    // const [credentials, setCredentials] = useState('')
    const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
    const {currentVenueID, setCurrentVenueID} = useContext(CurrentVenueIDContext);

    var data = {type:type, credentials:currentPassword}
    const navigate = useNavigate()
    // console.log(currentPassword)
    
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
          const responseBody = answer["data"]
    
          if (status === 400) {
            console.error(responseBody)
            console.log(answer)
            console.log(data);
          } else {
            navigate('/venuePage')
            setCurrentVenueID(responseBody)
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
        <input className= 'inputBox' type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
        
        <button className = "venueLoginButton" type="submit" onClick={handleLogin}>Login</button>
        <button className = "venueCreateButton" onClick={handleCreateVenue}>Do not have a venue? Create venue</button>
      </div>
    
    )
  }
  
  export default Login;