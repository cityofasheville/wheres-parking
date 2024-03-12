import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext'; // Ensure this path is correct
import city_logo_no_text from './city_logo_no_text.svg';

const Navbar = () => {
    const { theme } = useContext(ThemeContext);

    // Check if the theme is dark-theme to determine if dark mode is enabled
    const isDarkMode = theme === 'dark-theme';

    return (
        <nav className={`navbar navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src={city_logo_no_text} alt="City logo" className="navbar-logo me-2" />
                    <div>
                        <div className="navbar-title">Where's Parking?</div>
                        <p className="navbar-subtitle">Open spots in Asheville parking decks</p>
                    </div>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
