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
      <div className="max-w-screen-sm mx-auto px-3 mb-6 ">
        <fieldset className="grid grid-cols-2 gap-x-1 rounded-lg border">
          <legend className="">View Mode</legend>

          {/* OPTION 1: LIST */}
          <div>
            <input
              type="radio"
              name="viewOption"
              id="view-list"
              value="list"
              className="peer sr-only"
              checked={viewMode === 'list'}
              onChange={(e) => setViewMode(e.target.value)}
            />
            <label
              htmlFor="view-list"
              className="block cursor-pointer rounded-md py-2 px-4 text-center transition-all 
              hover:text-slate-900 
              peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-1
              peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-list-ul" aria-hidden="true"></i>
                List
              </span>
            </label>
          </div>

          {/* OPTION 2: MAP */}
          <div>
            <input
              type="radio"
              name="viewOption"
              id="view-map"
              value="map"
              className="peer sr-only"
              checked={viewMode === 'map'}
              onChange={(e) => setViewMode(e.target.value)}
            />
            <label
              htmlFor="view-map"
              className="block cursor-pointer rounded-md py-2 px-4 text-center transition-all 
              hover:text-slate-900 
              peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500 peer-focus-visible:ring-offset-1
              peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow-sm"
            >
              <span className="flex items-center justify-center gap-2">
                <i className="bi bi-map" aria-hidden="true"></i>
                Map
              </span>
            </label>
          </div>
        </fieldset>
      </div>

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
    </>
  );
}

export default GarageContainer;
