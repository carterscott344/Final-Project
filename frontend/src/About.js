import React from 'react';
import './About.css'; // You can add custom styling for the About page here
import marioJump from './images/marioJump.png'

const About = () => {
  return (
    <div className="about-page">
      <h1>About the Authors</h1>
      <p>This page was created as our final project for Com S 3190</p>

      <div className="authors-list">
        <div className="author">
          <h2>Carter Scott</h2>
          <p>Junior - Computer Science</p>
          <p>cas375@iastate.edu</p>
        </div>
        <img src={marioJump} alt='Mario jumping'></img>
        <div className="author">
          <h2>Davin Myers</h2>
          <p>Sophomore - Software Engineering</p>
          <p>dbmyers@iastate.edu</p>
        </div>

        {/* Add more authors as needed */}
      </div>
    </div>
  );
};

export default About;
