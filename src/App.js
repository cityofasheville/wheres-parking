import React, { useState, useEffect } from 'react';
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
import MyMap from './MyMap';
import Navbar from './Navbar';

const App = () => {
  const [hoveredGarage, setHoveredGarage] = useState(null);

  useEffect(() => {
    if (window.location.href.indexOf('cityofasheville.github.io') > -1) {
      ReactGA.initialize('UA-137810331-1');
      ReactGA.pageview(window.location.pathname);
    }
  }, []);

  const garageData = []; // actual garage data will go here

  useEffect(() => {
    console.log("Hovered Garage:", hoveredGarage);
  }, [hoveredGarage]);

  return (
    <>
      <Navbar />
      <div className="container-fluid my-4">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <GarageContainer setHoveredGarage={setHoveredGarage} />
          </div>
          <div className="col-lg-6">
            <MyMap garages={garageData} highlightedGarage={hoveredGarage} />
          </div>
        </div>
        <Appearance />
        <Footer />
      </div>
    </>
  );
};

export default App;