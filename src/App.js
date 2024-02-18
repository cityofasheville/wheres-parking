import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Variables.css';
import './styles/Layout.css';
import './styles/Links.css';
import './styles/GarageCard.css';
import './styles/AppearanceSelector.css';
import './styles/DarkTheme.css';
import GarageContainer from './GarageContainer';
import Appearance from './Appearance';
import Footer from './Footer';
import city_logo_no_text from './city_logo_no_text.svg';
import direction_icon from './direction_icon.svg';

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
      <Appearance />
      <Footer />
    </div>
  );
};

export default App;
