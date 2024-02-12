import React from 'react';
import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

const city_owned = ['Biltmore Ave.Garage', "Harrah's Cherokee Center Garage", 'Rankin Ave Garage', 'Wall Street Garage'];

const GarageCard = ({ available, coords, name }) => {
  // Function to remove "Garage" from the name if applicable
  const formatName = (garageName) => {
    const garageSuffix = " Garage";
    return garageName.endsWith(garageSuffix) ? garageName.slice(0, -garageSuffix.length) : garageName;
  };

  const isCityOwned = city_owned.includes(name);
  const icon = isCityOwned ? city_logo_no_text : bc_logo_brand;
  const altText = isCityOwned ? 'City of Asheville icon' : 'Buncombe County icon';
  const iconNameClass = isCityOwned ? 'GarageCard-city-icon' : 'GarageCard-bc-icon';

  return (
    <div>
      {available === undefined || coords === undefined ? (
        <div>Loading...</div>
      ) : (
        <a
          className="GarageCard-card"
          href={`https://maps.google.com/?saddr=Current+Location&daddr=${coords[0]},${coords[1]}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Directions to ${name}`}
        >
          <span className="GarageCard-name">
            <img src={icon} alt={altText} className={iconNameClass} />
            <span className="GarageCard-name-text">
              {formatName(name)}
              <span className="hidden">garage</span>
            </span>
          </span>
          <span className="GarageCard-available">
            {available}
            <span className="hidden">open spaces</span>
          </span>
        </a>
      )}
    </div>
  );
};

export default GarageCard;
