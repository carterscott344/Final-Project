import React from 'react';
import './Navbar.css'; 


import logoImage from './images/mainLogo.png';
import homeImage from './images/homeImage.png'; 
import gamesImage from './images/gamesImage.png'; 
import aboutImage from './images/aboutImage.png';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <a href="home">
                    <img src={logoImage} alt="Logo" className="navbar-logo-image" />
                </a>
            </div>
            <ul className="navbar-links">
                <li>
                    <a href="home" title="Home">
                        <img src={homeImage} alt="Home" className="navbar-icon" />
                    </a>
                </li>
                <li>
                    <a href="games" title="Games">
                        <img src={gamesImage} alt="Games" className="navbar-icon" />
                    </a>
                </li>
                <li>
                    <a href="about" title="About">
                        <img src={aboutImage} alt="About" className="navbar-icon" />
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
