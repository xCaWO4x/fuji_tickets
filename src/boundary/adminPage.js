import React, { useEffect, useContext } from 'react';
import './adminPage.css'; 
import { CurrentPasswordContext } from '../App';

const AdminPage = () => {
  const {currentPassword, setCurrentPassword} = useContext(CurrentPasswordContext);
  var data = {credentials: currentPassword}

// LAMBDA function for list venue is a POST method 

  const post = async () => {
    try {
      let payload = {
        method: 'POST',
        mode: 'cors', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      }
      //console.log(payload)
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/listVenues', payload);
      const answer = await response.json();
      const status = answer["statusCode"]
      const responseBody = answer["body"]

      if (status === 400) {
        console.error('here')
      } else {
        console.log(answer)
      }
    } 
    catch (error) {
      console.error('Error during authentication:', error);
    }
  }

  useEffect(() => {
    post();
  }, [])
    
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