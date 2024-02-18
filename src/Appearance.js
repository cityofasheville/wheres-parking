import React, { useContext, useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import sunSVG from './sun.svg'; 
import moonSVG from './moon.svg';

const Appearance = () => {
    const { theme, setExplicitTheme, setSystemTheme } = useContext(ThemeContext);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Determine the icon based on the current theme
    const appearanceIcon = theme === 'dark-theme' ? sunSVG : moonSVG;

    const handleThemeChange = (themeOption) => {
        setIsDropdownOpen(false); // Close the dropdown
        if (themeOption === 'system') {
            setSystemTheme();
        } else {
            setExplicitTheme(themeOption);
        }
    };

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (!event.target.closest('.appearance-selector') && isDropdownOpen) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isDropdownOpen]);

    return (
        <div className="appearance-selector">
            <button className={`appearance-button ${isDropdownOpen ? 'show' : ''}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img src={appearanceIcon} alt="Change appearance" className="icon-sun"/>
                <div className="tooltip">Change appearance</div>
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                <div className="dropdown-header">Appearance</div>
                {['system', 'dark', 'light'].map((themeOption) => (
                    <button
                        key={themeOption}
                        className={`dropdown-item ${theme === `${themeOption}-theme` ? 'selected' : ''}`}
                        onClick={() => handleThemeChange(themeOption)}
                    >
                        {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)} theme
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Appearance;
