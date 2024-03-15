import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import city_logo_no_text from './city_logo_no_text.svg';

const Navbar = () => {
    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark-theme';

    return (
        <nav className={`navbar ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`} style={{ padding: '10px 0' }}>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" style={{display: 'flex', alignItems: 'center', paddingLeft: '15px' }}>
                    <img src={city_logo_no_text} alt="City logo" className="d-inline-block align-top me-2" style={{height: '40px'}} />
                    <div>
                        <span className="navbar-title" style={{fontSize: '1.25rem', fontWeight: 'bold'}}>Where's Parking?</span>
                        <br />
                        <span className="navbar-subtitle" style={{fontSize: '1rem'}}>Open spots in Asheville parking decks</span>
                    </div>
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
