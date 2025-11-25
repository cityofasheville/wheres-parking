import React from 'react';
import bc_logo_brand from './bc_logo_brand.png';
import city_logo_no_text from './city_logo_no_text.svg';

const city_owned = [
  'Biltmore Ave.Garage',
  "Harrah's Cherokee Center Garage",
  'Rankin Ave Garage',
  'Wall Street Garage',
];

function GarageCard(props) {
  return (
    <tr style={{}}>
      {props.available === undefined || props.coords === undefined ? (
        <td colSpan={2}>Loading...</td>
      ) : (
        <>
          {/* <td className="GarageCard-name"> */}
          <td className="">
            <a
              // className="GarageCard-card"
              className=""
              href={`https://maps.google.com/?saddr=Current+Location&daddr=${props.coords[0]},${props.coords[1]}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                gap: '0.5rem',
                padding: '1rem 0',
                // minHeight: '3rem',
                // alignItems: 'baseline',
                width: '100%',
                // height: '100%',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div style={{ paddingLeft: '0.5rem' }}>
                <img
                  src={city_owned.indexOf(props.name) > -1 ? city_logo_no_text : bc_logo_brand}
                  alt={
                    city_owned.indexOf(props.name) > -1
                      ? 'City of Asheville icon'
                      : 'Buncombe County icon'
                  }
                  className={
                    city_owned.indexOf(props.name) > -1
                      ? 'GarageCard-city-icon'
                      : 'GarageCard-bc-icon'
                  }
                />
              </div>
              {/* <span className="GarageCard-name-text" style={{ flex: 1 }}> */}
              <span className="">
                {props.name.includes('Center') || props.name.includes('Garage')
                  ? props.name
                      .replace(/Center/, '')
                      .replace(/Garage$/, '')
                      .replace(/\./g, '')
                      .trim()
                  : props.name}
                <span className="hidden">garage</span>
              </span>
            </a>
          </td>
          {/* <td className="GarageCard-available" style={{ width: '5rem' }}> */}
          <td className="" style={{ textAlign: 'center' }}>
            <div className="space-count" style={{ padding: '1rem' }}>
              {props.available}
              <span className="hidden">open spaces</span>
            </div>
          </td>
        </>
      )}
    </tr>
  );
}

export default GarageCard;
