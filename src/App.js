import React from 'react';
import './App.css';
import CreateVenue from './controller/CreateVenue.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Seats4u</h1>
      </header>
      <main>
        <CreateVenue />
      </main>
    </div>
  );
}

export default App;
