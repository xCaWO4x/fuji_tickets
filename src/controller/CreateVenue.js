import React, { useState } from 'react';
import './CreateVenue.css'; // Ensure the path is correct

const CreateVenue = () => {
  // State for input fields (rows and columns for each section)
  const [sections, setSections] = useState({
    left: { rows: 4, columns: 3 },
    center: { rows: 4, columns: 3 },
    right: { rows: 4, columns: 3 }
  });

  // Handler for section input changes
  const handleSectionInputChange = (sectionName, type, value) => {
    setSections(prevSections => ({
      ...prevSections,
      [sectionName]: {
        ...prevSections[sectionName],
        [type]: parseInt(value, 10)
      }
    }));
  };

  // Function to generate seating layout for all sections
  const generateSectionsLayout = () => {
  const maxRows = Math.max(sections.left.rows, sections.center.rows, sections.right.rows);
  const totalColumns = sections.left.columns + sections.center.columns + sections.right.columns;

  let layout = [];
  const sectionLabels = (
    <div className="SectionLabels" key="section-labels">
      {['left', 'center', 'right'].map(sectionName => (
        <div className="SectionLabel" key={`${sectionName}-label`}>
          {sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}
        </div>
      ))}
    </div>
  );
  layout.push(sectionLabels);
  for (let r = 0; r < maxRows; r++) {
    let rowSeats = [];
    let cumulativeColumns = 0;
  
    for (let sectionName of ['left', 'center', 'right']) {
      const section = sections[sectionName];
      for (let c = 0; c < section.columns; c++) {
        if (r < section.rows) {
          const seatNum = String.fromCharCode('A'.charCodeAt(0) + r) + (c + 1);
          rowSeats.push(
            <div className="Seat" key={`${sectionName}-seat-${r}-${cumulativeColumns + c}`}>
              {seatNum}
            </div>
          );
        } else {
          // Add placeholder for invisible seats
          rowSeats.push(<div className="Seat Invisible" key={`${sectionName}-seat-${r}-${cumulativeColumns + c}`}></div>);
        }
      }
      cumulativeColumns += section.columns;
    }
  
    // Create a new row element for the current row of seats
    const rowElement = (
      <div className="Row" key={`row-${r}`}>
        {rowSeats}
      </div>
    );
  
  // move to the next row for the next iteration
  


    layout.push(rowElement);
  }

  return (
    <div className="Seating-section">
      {layout}
    </div>
  );
};



  return (
    <div className="CreateVenue">
      <div className="Venue-name-section">
        <label>Venue name:</label>
        <input type="text" placeholder="Enter venue name" className="Venue-input" />
        <button className="Create-button">Create Venue</button>
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
              value={sections[sectionName].rows}
              onChange={(e) => handleSectionInputChange(sectionName, 'rows', e.target.value)}
              className="Row-input"
            />
            <label>Input Column:</label>
            <input
              type="number"
              value={sections[sectionName].columns}
              onChange={(e) => handleSectionInputChange(sectionName, 'columns', e.target.value)}
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
