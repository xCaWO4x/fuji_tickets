import React, { useState } from 'react';
import './adminPage.css'; 

const AdminPage = () => {
    // const [credentials, setCredentials] = useState('')
  
    const handleClick = () => {
      // return null console.log('Authentication:', credentials)
      return null
    }
  
    return (
      <div>
        <button className = "adminPageButton" onClick={handleClick}>Generate Report</button>
      </div>
    
    )
  }
  
  export default AdminPage;