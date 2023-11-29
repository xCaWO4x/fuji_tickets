import React, { useState } from 'react';

const Login = () => {
    const [venueID, setVenueID] = useState('');
    const [credentials, setCredentials] = useState('');
  
    const handleSubmit = () => {
      // Logic goes here
      console.log('Authentication:', venueID, credentials);
    }

    // const handleCreateVenue = () => {
    //   // Logic goes here
    //   console.log('Redirect user to...')
    // }
  
    return (
     <form onSubmit={handleSubmit}>

      {/* <div>
        <h2>Venue Manager Login</h2>
        <label>Venue ID: </label>
        <input type="venueID" value={venueID} onChange={(e) => setVenueID(e.target.value)} />
      </div> */}
      
      <div>
        <label id='password'>Password: </label>
        <input type="password" value={credentials} onChange={(e) => setCredentials(e.target.value)} />
        {/* <button onClick={handleLogin}>Login</button>
        <button onClick={handleCreateVenue}>Create Venue</button> */}
      </div>
      <button type="submit">Submit</button>

      </form> 

    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label htmlFor="usernameInput">Password: </label>
    //     <input 
    //       id="venueLogin" 
    //       type="password"
    //     />
    //   </div>

    //   <button type="submit">Submit</button>
    // </form>
    )
  }
  
  export default Login;