import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar'; 
import About from './About';    
import Games from './Games';  
import Home from './Home';  


const App = () => {
  return (
    <Router>
      <div className="d-flex">
        <Navbar />
        <div className="flex-grow-1 p-3">
          <Routes>
            <Route path="/" element={<div>Welcome to the App! Please Press a button in the navbar</div>} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/games" element={<Games />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
