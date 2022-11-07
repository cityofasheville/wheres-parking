import React, { Component } from 'react';
import ReactGA from 'react-ga';
import city_logo_no_text from './city_logo_no_text.svg';
import city_logo from './city_logo.svg';
import bc_logo from './bc_logo.png';
import direction_icon from './direction_icon.svg';
import git_hub from './git_hub.svg';
import './App.css';
import GarageContainer from './GarageContainer';

if (window.location.href.indexOf('cityofasheville.github.io') > -1) {
  ReactGA.initialize('UA-137810331-1');
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
}

class App extends Component {
  render() {
    return (
      <main className="App">
        <header className="App-header">
          <img src={city_logo_no_text} className="App-logo-no-text" alt="logo" />
          <h1 className="App-title">Where's Parking?</h1>
          <p className="App-intro">
            Open spots in Asheville parking decks
          </p>
        </header>
        <section className="App-content">
          <header>
            <div style={{"border":"1px solid black", "padding":"10px"}}>
              <h2 className="App-instructions"><p style={{"color":"red"}}>Sorry, Asheville deck information is temporarily unavailable. The Buncombe County decks, (College and Coxe,) should be correct.
                </p>
                <p>
                Parking Services staff members are working with several vendors to finalize new parking availability signs, which have recently been installed. We expect that the new signs will be fully operational by early March 2023. 
                </p>
              </h2>
            </div>
            <h2 className="App-instructions">Click on a parking deck below for Google map directions
              <img src={direction_icon} className="App-direction_icon" alt="direction sign icon" />
            </h2>
          </header>
          <GarageContainer />
        </section>


        <footer className="App-footer">
          <div>
            <img src={city_logo} alt="City of Asheville logo" className="App-logo" /><div className="App-cooperation">in cooperation with</div><div className="App-cooperation-small">with</div><img src={bc_logo} alt="Buncombe County logo" className="App-bc-logo" />
          </div>
          <div className="App-open-source">It's open source! Fork it on <a href="https://github.com/cityofasheville/wheres-parking" target="_blank" rel="noopener noreferrer">GitHub <img src={git_hub} alt="" /> </a></div>
        </footer>
      </main>
    );
  }
}

export default App;
