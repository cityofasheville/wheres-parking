import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import GarageContainer from './GarageContainer';
import city_logo_no_text from './city_logo_no_text.svg';
import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';
import direction_icon from './direction_icon.svg';
import git_hub from './git_hub.svg';

const App = () => {
  useEffect(() => {
    if (window.location.href.indexOf('cityofasheville.github.io') > -1) {
      ReactGA.initialize('UA-137810331-1');
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  return (
    <div className="container my-4">
      <header className="text-center mb-5">
        <img src={city_logo_no_text} alt="City logo" className="mb-3" style={{ maxWidth: '80px', height: 'auto' }} />
        <h1 className="h2 mb-3">Where's Parking?</h1>
        <p className="lead">Open spots in Asheville parking decks</p>
      </header>
      <div className="text-center mb-4">
        <p className="mb-3" style={{ fontSize: '1rem', color: '#6c757d' }}>Click on a parking deck below for Google map directions
          <img src={direction_icon} alt="direction sign icon" className="ml-2" style={{ width: '20px', verticalAlign: 'bottom' }} />
        </p>
      </div>
      <GarageContainer />
      <footer className="mt-5 pt-4 border-top text-muted text-center">
        <img src={city_logo} alt="City of Asheville logo" style={{ width: '100px', margin: '0 5px' }} />
        <span className="mx-2 cooperation-text-long">in cooperation with</span>
        <span className="mx-2 cooperation-text-short d-inline d-md-none">with</span> {/* Show "with" only on xs to sm screens */}
        <img src={bc_logo} alt="Buncombe County logo" style={{ width: '160px', margin: '0 5px' }} />
        <div className="mt-3">
          It's open source! Fork it on
          <a href="https://github.com/cityofasheville/wheres-parking" target="_blank" rel="noopener noreferrer" className="text-primary ml-1">
            GitHub <img src={git_hub} alt="" style={{ width: '24px' }} />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
