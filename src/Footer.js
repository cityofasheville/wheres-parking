import React from 'react';
import { useTheme } from './ThemeContext';
import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';
import git_hub from './git_hub.svg';

const Footer = () => {
    const { theme } = useTheme();

    // Determine the classes based on the theme
    const footerTextClass = theme === 'dark' ? 'text-light' : '';
    const footerBgClass = theme === 'dark' ? 'bg-dark' : '';
    const invertLogoClass = theme === 'dark' ? 'invert-logo' : '';

    return (
        <footer className={`mt-5 pt-4 border-top text-center ${footerTextClass} ${footerBgClass}`}>
            <img src={city_logo} alt="City of Asheville logo" style={{ width: '100px', margin: '0 5px' }} />
            <span className={`${footerTextClass} mx-2 cooperation-text`}>in cooperation with</span>
            <img src={bc_logo} className={invertLogoClass} alt="Buncombe County logo" style={{ width: '160px', margin: '0 5px' }} />
            <div className={`mt-3 ${footerTextClass}`}>
                It's open source! Fork it on{' '}
                <a href="https://github.com/cityofasheville/wheres-parking" target="_blank" rel="noopener noreferrer" className={`ml-1 ${theme === 'dark' ? 'text-primary' : 'text-secondary'}`}>
                    GitHub <img src={git_hub} alt="" style={{ width: '24px' }} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
