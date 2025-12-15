import { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';

import { fetchAllGarageData } from './utilities';

function GaragePage(params) {
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const intervalRef = useRef(null);

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
    intervalRef.current = setInterval(async () => {
      const allGarages = await fetchAllGarageData();
      const found = allGarages.find((g) => g.slug === params.params.garage);
      setGarage(found || null);
    }, 10000);
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const androidDetected = /android/i.test(userAgent);
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;

    // from https://github.com/atomantic/is-ua-webview/blob/main/data/rules.js
    const rules = [
      'WebView',
      '(iPhone|iPod|iPad)(?!.*Safari)',
      'Android.*(;\\s+wv|Version/\\d.\\d\\s+Chrome/\\d+(\\.0){3})',
      'Linux; U; Android',
    ];
    const webviewRegExp = new RegExp('(' + rules.join('|') + ')', 'ig');
    const isWebView = userAgent.match(webviewRegExp) !== null;

    setIsIframe(isIframe);
    setIsAndroid(androidDetected);
    setIsWebView(isWebView);

    console.log(
      'User agent detected:',
      userAgent,
      'Android:',
      androidDetected,
      'Is iframe:',
      isIframe,
      'Is webview:',
      isWebView
    );
  }, []);

  function handleCopyAddress(address) {
    navigator.clipboard.writeText(address).then(
      () => {
        console.log('Address copied to clipboard!');
        setAddressCopied(true);
        setTimeout(() => setAddressCopied(false), 3000);
      },
      (err) => {
        console.log('Could not copy address. Clipboard access denied.', err);
      }
    );
  }

  return (
    <div className="">
      {loading && <div>Loading garage details...</div>}
      {!loading && !garage && <div>Garage not found.</div>}
      {!loading && garage && (
        <main>
          <header className="mb-6">
            <div className="w-full flex items-center justify-between gap-4 mb-2">
              <h2 className="text-3xl font-light">{!loading && garage && `${garage.name}`}</h2>
              <a href="/" className="text-wp-blue-dark hover:underline inline-block">
                Back
              </a>
            </div>
            <p className="text-slate-600 mb-2">
              {garage.jurisdiction === 'city'
                ? 'Managed by City of Asheville'
                : 'Managed by Buncombe County'}
            </p>
            <address className="text-slate-600 not-italic mb-4">
              <span className="inline-block mr-2">Address: {garage.address}</span>
              <button
                className="text-wp-blue-dark hover:font-semibold inline-block"
                onClick={() => handleCopyAddress(garage.address)}
              >
                <i className="bi bi-copy" aria-hidden="true"></i>
                <span className="sr-only">Copy address to clipboard</span>
              </button>
              <span className="text-sm text-green-800 ml-2">
                {addressCopied ? ' Address copied!' : ''}
              </span>
            </address>

            <div className="flex items-baseline gap-1 border border-wp-blue-dark/20 rounded bg-wp-blue-light px-4 py-2 w-max">
              <div className="text-3xl font-light">{garage.available}</div>
              <div>available spaces</div>
            </div>
          </header>

          {/* <iframe
            title="Map showing pin for <?php echo the_title() ?> at <?php echo $meeting_location; ?>"
            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${garage.address}&zoom=16`}
            width="100%"
            height="400px"
            className="mb-6"
          ></iframe> */}

          <div className="mb-6">
            <APIProvider
              apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              onLoad={() => console.log('Maps API has loaded.')}
            >
              <Map
                style={{ width: '100%', height: '400px' }}
                defaultCenter={{ lat: garage.coords[0], lng: garage.coords[1] }}
                defaultZoom={15}
                disableDefaultUI={false}
                controlSize={35}
              >
                <Marker position={{ lat: garage.coords[0], lng: garage.coords[1] }} />
              </Map>
            </APIProvider>
          </div>

          {(!isAndroid || (isAndroid && !isWebView)) && (
            <div>
              <a
                href={`https://maps.google.com/?saddr=Current+Location&daddr=${garage.address}`}
                target="_blank"
                className="w-full bg-wp-blue-dark hover:bg-blue-800 focus:bg-blue-800 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-blue-200 shadow-lg"
              >
                <i className="bi bi-signpost-split" aria-hidden="true"></i>Open Navigation App
              </a>
              <p className="text-center text-xs text-slate-400 mt-3">
                Directions calculated from your current location.
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  );
}

export default GaragePage;
