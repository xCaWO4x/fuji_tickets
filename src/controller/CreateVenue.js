import React, { useState, useContext } from 'react';
import './CreateVenue.css'; 
import { useNavigate } from 'react-router-dom';
// import { CurrentPasswordContext } from '../App';
import { CurrentVenueIDContext } from '../App';


const CreateVenue = () => {
  const [venueName, setVenueName] = useState('');
  const [credentials, setCredentials] = useState(''); // State for credentials
  const {currentVenueID, setCurrentVenueID} = useContext(CurrentVenueIDContext);

  const [sections, setSections] = useState([
    { sectionName: 'left', numRows: 3, numCol: 3 },
    { sectionName: 'center', numRows: 3, numCol: 4 },
    { sectionName: 'right', numRows: 3, numCol: 3 },
  ]);

  // const { setCurrentPassword } = React.useContext(CurrentPasswordContext);
  // const { setCurrentVenue } = React.useContext(CurrentVenueContext);
  // Input for POST method

  var data = {
    name: venueName,
    credentials: credentials,
    layouts: sections.map(section => ({
      section: section.sectionName,
      numRows: section.numRows.toString(),
      numCols: section.numCol.toString()
    }))
  };
    
   const handlecreateVenue = async () => {
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
      const response = await fetch('https://8uwxmxcgd2.execute-api.us-east-2.amazonaws.com/Nov30-2023-Class/fujiwara/addVenue', payload);
      const answer = await response.json();
      const status = answer["statusCode"];
      const responseBody = answer["data"];
      setCurrentVenueID(responseBody)
      console.log(answer)

      if (status === 400) {
        console.error('Input error')
        alert('Venue Already Exists')
      } else {
        navigate('/venuePage') 
        console.log('Venue has been created')
        console.log(payload.body)
        // setCurrentPassword(credentials)
        // setCurrentVenue(venueName)
      }
    } 
    catch (error){
      console.error('Error during authentication:', error)
      console.log(data)
    }
} 
  
  // Handler for section input changes
  const handleSectionInputChange = (sectionName, type, value) => {
    setSections(prevSections => prevSections.map(section => {
      if (section.sectionName === sectionName) {
        return { ...section, [type]: parseInt(value, 10) };
      }
      return section;
    }));
  };

  // Function to generate seating layout for all sections
  const generateSectionsLayout = () => {
    const maxRows = Math.max(...sections.map(section => section.numRows));
  
    let layout = [];
    const sectionLabels = (
      <div className="SectionLabels" key="section-labels">
        {sections.map(section => (
          <div className="SectionLabel" key={`${section.sectionName}-label`}>
            {section.sectionName.charAt(0).toUpperCase() + section.sectionName.slice(1)}
          </div>
        ))}
      </div>
    );
    layout.push(sectionLabels);
  
    for (let r = 0; r < maxRows; r++) {
      let rowSeats = [];
      for (let section of sections) {
        for (let c = 0; c < section.numCol; c++) {
          if (r < section.numRows) {
            // Each section starts with A1, A2, etc.
            const seatNum = String.fromCharCode('A'.charCodeAt(0) + r) + (c + 1);
            rowSeats.push(
              <div className={`Seat ${section.sectionName}`} key={`${section.sectionName}-seat-${r}-${c}`}>
                {seatNum}
              </div>
            );
          } else {
            // Add placeholder for invisible seats
            rowSeats.push(<div className={`Seat Invisible ${section.sectionName}`} key={`${section.sectionName}-seat-${r}-${c}`}></div>);
          }
        }
      }
  
      // Create a new row element for the current row of seats
      const rowElement = (
        <div className="Row" key={`row-${r}`}>
          {rowSeats}
        </div>
      );
      layout.push(rowElement);
    }
  
    return (
      <div className="Seating-section">
        {layout}
      </div>
    );
  };
  
  

const handleCreateShow = () => {
  navigate("/createShow")
}

const navigate = useNavigate();



  return (
    <div className="CreateVenue">
      <div className="Venue-name-section">
        <label>Venue name:</label>
        <input type="text" value = {venueName} 
          onChange={(e) => setVenueName(e.target.value)}
          placeholder="Enter venue name" className="Venue-input" />
        {/* This password input label is temporary. We will change to jwt? token for the next iteration */}
        <input type="text" value = {credentials} 
          onChange={(e) => setCredentials(e.target.value)}
          placeholder="Choose a Password" className="Venue-input" />
        <button className="Create-button" onClick={handlecreateVenue}>Create Venue</button>    
      </div>
      <div className="Stage">Stage</div>
      <div className="Seating-layout">
        {generateSectionsLayout()}
      </div>
      {['left', 'center', 'right'].map(sectionName => (
        <div className="Inputs" key={`${sectionName}-inputs`}>
          <div className="Input-section">
            <label>{`${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)} Side - Input Row:`}</label>
            <input
              type="number"
              value={sections.numRows}
              onChange={(e) => handleSectionInputChange(sectionName, 'numRows', e.target.value)}
              className="Row-input"
            />
            <label>Input Column:</label>
            <input
              type="number"
              value={sections.numCol}
              onChange={(e) => handleSectionInputChange(sectionName, 'numCol', e.target.value)}
              className="Column-input"
            />
          </div>
        </div>
      ))}
      <div className="Note">
        <p>After entering all attributes and creating the venue, the login credentials will be presented on the screen.</p>
      </div>
    </div>
  );
};

export default CreateVenue;