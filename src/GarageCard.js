import React from 'react';
import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

const city_owned = ['Biltmore Ave.Garage', "Harrah's Cherokee Center Garage", 'Rankin Ave Garage', 'Wall Street Garage'];

const GarageCard = props => (
  <div>
    {props.available === undefined || props.coords === undefined ?
      <div>Loading...</div>
      :
      <a
        className="GarageCard-card"
        href={`https://maps.google.com/?saddr=Current+Location&daddr=${props.coords[0]},${props.coords[1]}`}
        target="_blank" rel="noopener noreferrer"
      >
        <span className="GarageCard-name">
          <img
            src={city_owned.indexOf(props.name) > -1 ? city_logo_no_text : bc_logo_brand}
            alt={city_owned.indexOf(props.name) > -1 ? 'City of Asheville icon' : 'Buncombe County icon'}
            className={city_owned.indexOf(props.name) > -1 ? 'GarageCard-city-icon' : 'GarageCard-bc-icon'}
          />
          <span className="GarageCard-name-text">
            { 
              props.name.includes('Center') || props.name.includes('Garage') ? props.name.replace(/Center/, '').replace(/Garage$/, '').replace(/\./g, '').trim()
              :
              props.name
            }
            <span className="hidden">garage</span>
          </span>
        </span>
        <span className="GarageCard-available">
          {props.available}
          <span className="hidden">open spaces</span>
        </span>
      </a>
    }
  </div>
);

export default GarageCard;
