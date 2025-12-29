import { useState, useEffect, useRef } from 'react';
import GarageTable from './GarageTable';
import GarageMap from './GarageMap';
import { fetchAllGarageData } from './utilities';

function GarageContainer() {
  const [allGarages, setAllGarages] = useState([]);
  const [viewMode, setViewMode] = useState('list');
  const intervalRef = useRef(null);

  useEffect(() => {
    async function loadData() {
      const garageData = await fetchAllGarageData();
      setAllGarages(garageData);
    }
    loadData();
  }, []);

  useEffect(() => {
    // intervalRef.current = setInterval(async () => {
    //   const garageData = await fetchAllGarageData();
    //   setAllGarages(garageData);
    // }, 30000);
    // return () => {
    //   clearInterval(intervalRef.current);
    // };
  }, []);

  if (!allGarages || allGarages.length === 0) {
    return <div>Loading garage data...</div>;
  }

  return (
    <>
      <div className="max-w-screen-sm mx-auto px-3 mb-4">
        <fieldset className="border-2 border-transparent -mx-3 px-3">
          <legend className="sr-only">View Mode</legend>

          <div className="grid grid-cols-2 py-3 btn-group">
            <label
              htmlFor="view-list"
              className="block cursor-pointer rounded-md py-2 px-4 text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-list-ul" aria-hidden="true"></i>
                List
              </span>
              <input
                type="radio"
                name="viewOption"
                id="view-list"
                value="list"
                className="opacity-0 absolute top-0 left-0"
                checked={viewMode === 'list'}
                onChange={(e) => setViewMode(e.target.value)}
              />
            </label>

            <label
              htmlFor="view-map"
              className="block cursor-pointer rounded-md py-2 px-4 text-center"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-map" aria-hidden="true"></i>
                Map
              </span>
              <input
                type="radio"
                name="viewOption"
                id="view-map"
                value="map"
                className="opacity-0 absolute top-0 left-0"
                checked={viewMode === 'map'}
                onChange={(e) => setViewMode(e.target.value)}
              />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="mb-12">
        {viewMode === 'list' && (
          <div className="max-w-screen-sm mx-auto px-3">
            <GarageTable garages={allGarages} />
          </div>
        )}
        {viewMode === 'map' && (
          <div className="max-w-screen-sm mx-auto px-3">
            <GarageMap garages={allGarages} />
          </div>
        )}
      </div>
    </>
  );
}

export default GarageContainer;
