import { useState, useEffect, useRef } from 'react';
import GarageCard from './GarageCard';
import { fetchAllGarageData } from './utilities';

function GarageContainer() {
  const [allGarages, setAllGarages] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const garageData = await fetchAllGarageData();
      setAllGarages(garageData);
    }
    loadData();
  }, []);

  useEffect(() => {
    intervalRef.current = setInterval(async () => {
      const garageData = await fetchAllGarageData();
      setAllGarages(garageData);
    }, 30000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div>
      {allGarages.length === 0 ? (
        'Loading garage data...'
      ) : (
        <table>
          <thead className="">
            <tr className="text-lg sm:text-xl bg-wp-blue-light text-wp-blue-dark">
              <th className="p-3 font-normal text-left">Garage name</th>
              <th className="p-3 w-24 font-normal text-center">Open spaces</th>
            </tr>
          </thead>
          <tbody>
            {allGarages.length > 0 &&
              allGarages.map((deck) => (
                <GarageCard
                  key={deck.name}
                  name={deck.name}
                  slug={deck.slug}
                  available={deck.available}
                  coords={deck.coords}
                  jurisdiction={deck.jurisdiction}
                />
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default GarageContainer;
