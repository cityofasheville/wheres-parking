import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

const city_owned = ['Biltmore Ave Garage', "Harrah's Cherokee Center Garage", 'Rankin Ave Garage', 'Wall Street Garage'];

const GarageCard = ({ available, coords, name, onMouseEnter, onMouseLeave }) => {
  const { theme } = useContext(ThemeContext);

  const formatName = (garageName) => {
    // Check if 'Garage' is at the end and prepend a space if it's not there.
    if (garageName.endsWith('Garage') && !garageName.endsWith(' Garage')) {
      return garageName.slice(0, -'Garage'.length) + ' Garage';
    }
    return garageName;
  };


  const isCityOwned = city_owned.includes(name);
  const icon = isCityOwned ? city_logo_no_text : bc_logo_brand;
  const altText = isCityOwned ? 'City of Asheville icon' : 'Buncombe County icon';

  // Define cardClassName based on the theme
  const cardClassName = `garage-card ${theme}-theme`;

  return (
    <div className="d-flex justify-content-center" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <a
        href={`https://maps.google.com/?saddr=Current+Location&daddr=${coords[0]},${coords[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Directions to ${name}`}
        className={cardClassName}
      >
        <div className="d-flex align-items-center">
          <img src={icon} alt={altText} className={`garage-card-icon`} />
          <span className={`garage-card-name`}>
            {formatName(name)}
          </span>
        </div>
        <span className={`garage-card-available`}>{available}</span>
      </a>
    </div>
  );
};

export default GarageCard;
