import React from 'react';
import { useTheme } from './ThemeContext';
import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';
import git_hub from './git_hub.svg';

const Footer = () => {
    const { theme } = useTheme();
    const footerTextClass = theme === 'dark' ? 'text-light' : '';
    const footerBgClass = theme === 'dark' ? 'bg-dark' : '';
    const invertLogoClass = theme === 'dark' ? 'invert-logo' : '';

    return (
        <footer className={`mt-5 pt-4 border-top ${footerTextClass} ${footerBgClass} d-flex flex-column flex-lg-row justify-content-between align-items-center px-3`}>
            <div className="footer-left mb-3 mb-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start">
                <img src={city_logo} alt="City of Asheville logo" className="me-2" style={{ width: '80px', maxWidth: '100%' }} />
                <span className={`${footerTextClass} mx-2 d-none d-lg-inline`}>in cooperation with</span>
                <img src={bc_logo} alt="Buncombe County logo" className={`${invertLogoClass} me-2`} style={{ width: '120px', maxWidth: '100%' }} />
            </div>
            <div className="footer-right d-flex align-items-center justify-content-center justify-content-lg-end">
                <span className={`${footerTextClass}`}>
                    It's open source! Fork it on{' '}
                    <a href="https://github.com/cityofasheville/wheres-parking" target="_blank" rel="noopener noreferrer" className={`${theme === 'dark' ? 'text-primary' : 'text-secondary'}`}>
                        GitHub <img src={git_hub} alt="GitHub" style={{ width: '24px', maxWidth: '100%' }} />
                    </a>
                </span>
            </div>
        </footer>
    );
};

export default Footer;