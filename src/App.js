import React from 'react';
import ReactGA from 'react-ga';
import city_logo_no_text from './city_logo_no_text.svg';
import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';
import direction_icon from './direction_icon.svg';
import git_hub from './git_hub.svg';
import './App.css';
import GarageContainer from './GarageContainer';

function App() {
  if (window.location.href.indexOf('cityofasheville.github.io') > -1) {
    ReactGA.initialize('UA-137810331-1');
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={city_logo_no_text} className="App-logo-no-text" alt="logo" />
        <h1 className="App-title">Where's Parking?</h1>
        <p className="App-intro">Open spots in Asheville parking decks</p>
      </header>
      <main className="App-content">
        <p className="App-instructions">
          Click on a parking deck below for Google map directions
          <img src={direction_icon} className="App-direction_icon" alt="direction sign icon" />
        </p>
        <GarageContainer />
      </main>

      <footer className="App-footer">
        <div>
          <img src={city_logo} alt="City of Asheville logo" className="App-logo" />
          <div className="App-cooperation">in cooperation with</div>
          <div className="App-cooperation-small">with</div>
          <img src={bc_logo} alt="Buncombe County logo" className="App-bc-logo" />
        </div>
        <div className="App-open-source">
          It's open source! Fork it on{' '}
          <a
            href="https://github.com/cityofasheville/wheres-parking"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub <img src={git_hub} alt="" />
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
