import React, { useState, useEffect, useRef } from 'react';
import GarageCard from './GarageCard';

function GarageContainer() {
  const [cityGarages, setCityGarages] = useState({ decks: [] });
  const [countyGarages, setCountyGarages] = useState({ decks: [] });
  const intervalRef = useRef(null);

  const fetchAllGarageData = () => {
    Promise.all([
      fetch('https://s3.amazonaws.com/avl-parking-decks/spaces.json').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/164College').then((res) => res.json()),
      fetch('https://s3.amazonaws.com/bc-parking-decks/40Coxe').then((res) => res.json()),
    ])
      .then(([cityData, collegeJSON, coxeJSON]) => {
        const modifiedCityData = {
          ...cityData,
          //Rankin Ave will be closed for 1 month starting 8/1
          //<start> Comment this section when it reopens
          // decks: cityData.decks.map(garage => {
          //     if (garage.name === "Wall Street Garage") {
          //         return { ...garage, available: 'closed' };
          //     }
          //     return garage;
          // })
          //<end> Comment this section when it reopens
        };
        setCityGarages(modifiedCityData);

        setCountyGarages({
          decks: [
            {
              name:
                collegeJSON.decks && collegeJSON.decks.length > 0
                  ? 'College Street'
                  : '164 College Street',
              available:
                collegeJSON.decks && collegeJSON.decks.length > 0
                  ? collegeJSON.decks[0].available
                  : 'Unable to determine',
              coords:
                collegeJSON.decks && collegeJSON.decks.length > 0
                  ? collegeJSON.decks[0].coords
                  : [35.591976, -82.545413],
            },
            {
              name:
                coxeJSON.decks && coxeJSON.decks.length > 0
                  ? coxeJSON.decks[0].name
                  : '40 Coxe Avenue',
              available:
                coxeJSON.decks && coxeJSON.decks.length > 0
                  ? coxeJSON.decks[0].available
                  : 'Unable to determine',
              coords:
                coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].coords : [0, 0],
            },
          ],
        });
      })
      .catch((error) => console.log(error));
  };

  const sortGarages = (city, county) => {
    const combined = city.concat(county);
    combined.sort(function (a, b) {
      return a.name > b.name ? 1 : b.name > a.name ? -1 : 0;
    });
    return combined;
  };

  useEffect(() => {
    fetchAllGarageData();
    intervalRef.current = setInterval(() => {
      fetchAllGarageData();
    }, 10000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      <table style={{ width: '100%' }}>
        <thead className="">
          <tr className="">
            <th>Garage name</th>
            <th style={{ width: '6rem', textAlign: 'center' }}>Open spaces</th>
          </tr>
        </thead>
        <tbody>
          {sortGarages(cityGarages.decks, countyGarages.decks).map((deck) => (
            <GarageCard
              name={deck.name}
              key={deck.name}
              available={deck.available}
              coords={deck.coords}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GarageContainer;
