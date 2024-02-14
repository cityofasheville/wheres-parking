import React from 'react';
import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

const city_owned = ['Biltmore Ave.Garage', "Harrah's Cherokee Center Garage", 'Rankin Ave Garage', 'Wall Street Garage'];

const GarageCard = ({ available, coords, name }) => {
  const formatName = (garageName) => {
    const garageSuffix = ".Garage";
    return garageName.endsWith(garageSuffix) ? garageName.slice(0, -garageSuffix.length) : garageName;
  };

  const isCityOwned = city_owned.includes(name);
  const icon = isCityOwned ? city_logo_no_text : bc_logo_brand;
  const altText = isCityOwned ? 'City of Asheville icon' : 'Buncombe County icon';

  // Inline styles for the card
  const cardStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    width: '100%',
    maxWidth: '600px',
    backgroundColor: '#f8f9fa',
    color: '#007bff',
    textDecoration: 'none',
    border: '1px solid #dee2e6',
    borderRadius: '0.25rem',
    marginBottom: '0.5rem',
    transition: 'background-color .3s', // Smooth transition for background color
  };

  // Hover effect using onMouseEnter and onMouseLeave
  const handleMouseEnter = (e) => {
    e.currentTarget.style.backgroundColor = '#e2e6ea'; // Slightly darker shade on hover
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.backgroundColor = '#f8f9fa'; // Original background color
  };

  return (
    <div className="d-flex justify-content-center">
      <a
        href={`https://maps.google.com/?saddr=Current+Location&daddr=${coords[0]},${coords[1]}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Directions to ${name}`}
        style={cardStyle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="border rounded w-100"
      >
        <div className="d-flex align-items-center">
          <img src={icon} alt={altText} style={{ width: '20px', height: '20px', marginRight: '10px' }} />
          <span style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
            {formatName(name)}
          </span>
        </div>
        <span style={{ fontSize: '0.9rem' }}>{available}</span>
      </a>
    </div>
  );
};

export default GarageCard;
