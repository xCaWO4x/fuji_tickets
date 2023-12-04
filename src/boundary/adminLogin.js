import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    // const [adminId, setAdminID] = useState('');
    const type = 'Admin'
    const [adminPassword, setAdminPassword] = useState('');
    const navigate = useNavigate()

    var data = {type:type, credentials:adminPassword}
  
    const handleAdminLogin = async () => {
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

          if(status===400){
            console.error('Authentication failed')
          }
          else {
            navigate('/adminPage')
          } 
        }
        catch (error) {
            console.error('Error during authentication:', error);
        }
}
    return (
      <div>
        <h2 className = "adminLoginHeader">Admin Login</h2>
        {/* <label className='adminText'>Admin Username:  </label> */}
        {/* <input type="text" value={adminId} onChange={(e) => setAdminID(e.target.value)} /> */}
    
        <label className='adminText'>Password: </label>
        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
        <button className = "adminLoginButton" onClick={handleAdminLogin}>Login</button>
      </div>
    
    )
  }
  
  export default AdminLogin;