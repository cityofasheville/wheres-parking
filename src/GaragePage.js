import { useState, useEffect } from 'react';
import { fetchAllGarageData } from './utilities';

function GaragePage(params) {
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAndroid, setIsAndroid] = useState(false);

  // const slug = params.params.garage;

  useEffect(() => {
    async function loadGarage() {
      setLoading(true);
      const allGarages = await fetchAllGarageData();
      const found = allGarages.find((g) => g.slug === params.params.garage);
      setGarage(found || null);
      setLoading(false);
    }
    loadGarage();
  }, [params.params.garage]);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const androidDetected = /android/i.test(userAgent);
    setIsAndroid(androidDetected);

    // console.log('User agent detected:', userAgent);
  }, []);

  return (
    <div className="">
      {loading && <div>Loading garage details...</div>}
      {!loading && !garage && <div>Garage not found.</div>}
      {!loading && garage && (
        <main>
          <header className="mb-6">
            <h2 className="text-3xl font-light mb-4">{!loading && garage && `${garage.name}`}</h2>
            <div className="flex items-baseline gap-1 border border-wp-blue-dark/20 rounded bg-wp-blue-light px-4 py-2 w-max">
              <div className="text-3xl font-light">{garage.available}</div>
              <div>available spaces</div>
            </div>
          </header>
          <iframe
            title="Map showing pin for <?php echo the_title() ?> at <?php echo $meeting_location; ?>"
            src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCmuGYLxWRnYPXUHqCU0kuiURMVNb-50u8&origin=Current+Location&destination=${garage.coords[0]},${garage.coords[1]}`}
            width="100%"
            height="400px"
            className="mb-6"
          ></iframe>
          <p className="text-slate-600 mb-2">Address: {garage.address}</p>
          <p className="text-slate-600 mb-6">
            {garage.jurisdiction === 'city'
              ? 'Managed by City of Asheville'
              : 'Managed by Buncombe County'}
          </p>
          {!isAndroid && (
            <>
              <a
                href={`https://maps.google.com/?saddr=Current+Location&daddr=${garage.coords[0]},${garage.coords[1]}`}
                target="_blank"
                className="w-full bg-blue-800 hover:bg-wp-blue-dark active:bg-wp-blue-dark text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-blue-200 shadow-lg"
              >
                <i className="bi bi-signpost-split" aria-hidden="true"></i>Open Navigation App
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">
                Directions calculated from your current location.
              </p>
            </>
          )}
        </main>
      )}
    </div>
  );
}

export default GaragePage;
