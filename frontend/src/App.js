import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; 
import About from './About';    
import Games from './Games';  


const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Navbar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<div>Welcome to the App!</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
