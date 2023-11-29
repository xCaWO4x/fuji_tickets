import React, { useState } from 'react';

const AdminLogin = () => {
    const [adminId, setAdminID] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
  
    const handleAdminLogin = () => {
    // logic goes here
      return null
    }
  
    return (
      <div>
        <h2 className = "adminLoginHeader">Admin Login</h2>
        
         {/* should be admin name? */}
        <label className='adminText'>Admin Username:  </label>
        <input type="text" value={adminId} onChange={(e) => setAdminID(e.target.value)} />
    
        <label className='adminText'>Password: </label>
        <input type="password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />

        <button className = "adminLoginButton" onClick={handleAdminLogin}>Login</button>
      </div>
    
    )
  }
  
  export default AdminLogin;