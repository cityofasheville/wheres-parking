import { useState, useEffect, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet-gesture-handling';
import Loading from './Loading';

import { fetchConsolidatedGarageData } from './utilities';

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

function GaragePage(params) {
  const [garage, setGarage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIframe, setIsIframe] = useState(false);
  const [isWebView, setIsWebView] = useState(false);
  const [addressCopied, setAddressCopied] = useState(false);

  const currentSlugRef = useRef(params.params?.garage);
  const intervalRef = useRef(null);

  const garageSlug = params.params?.garage;

  useEffect(() => {
    currentSlugRef.current = params.params.garage;
  }, [params.params.garage]);

  const loadGarageData = useCallback(
    async (isPolling = false, retryCount = 0) => {
      if (!isPolling && retryCount === 0) {
        setLoading(true);
      }

      try {
        const allGarages = await fetchConsolidatedGarageData();

        if (!allGarages || !Array.isArray(allGarages)) {
          throw new Error('Received invalid garage data.');
        }

        // Bail if the user navigated away while we were fetching/waiting
        if (garageSlug !== currentSlugRef.current) {
          return;
        }

        const found = allGarages.find((g) => g.slug === garageSlug);

        if (found) {
          setGarage(found);
          if (!isPolling) {
            setLoading(false);
          }
        } else {
          if (isPolling) {
            console.warn(`Garage ${garageSlug} missing during poll. Retaining stale data.`);
          } else {
            if (retryCount < MAX_RETRIES) {
              console.log(`Garage not found. Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
              await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));

              // RECURSIVE CALL: Try again with incremented count
              return loadGarageData(false, retryCount + 1);
            } else {
              console.error(`Garage ${garageSlug} not found after ${MAX_RETRIES} retries.`);
              setGarage(null);
              setLoading(false);
            }
          }
        }
      } catch (error) {
        console.error('Error loading garage data:', error);

        if (!isPolling && retryCount >= MAX_RETRIES) {
          setLoading(false);
        }
      }
    },
    [garageSlug]
  );

  useEffect(() => {
    setGarage(null);
    loadGarageData(false, 0);
  }, [loadGarageData]);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      loadGarageData(true, 0);
    }, 30000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [loadGarageData]);

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
  }, []);

  function handleCopyAddress(address) {
    navigator.clipboard.writeText(address).then(
      () => {
        setAddressCopied(true);
        setTimeout(() => setAddressCopied(false), 3000);
      },
      (err) => {
        console.log('Unable to copy address to cloipboard.', err);
      }
    );
  }

  if (loading) {
    return <Loading>Loading garage details...</Loading>;
  }
  if (!garage) {
    return (
      <div className="max-w-screen-sm mx-auto px-3 mb-12">
        <div>Garage not found. Please check the URL or try again later.</div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-sm mx-auto px-3 mb-12">
      <header className="mb-6">
        <div className="w-full flex items-center justify-between gap-4 mb-2">
          <h2 className="text-3xl font-light">{!loading && garage && `${garage.name}`}</h2>
          <button
            onClick={() => {
              history.back();
            }}
            className="font-medium text-wp-blue-dark hover:underline inline-block text-nowrap"
          >
            <i className="bi bi-arrow-left mr-1" aria-hidden="true"></i>
            Back
          </button>
        </div>
        <address className="text-slate-600 not-italic mb-2">
          <span className="inline-block mr-2">Address: {garage.address}</span>
          <button
            className="text-wp-blue-dark hover:font-semibold inline-block"
            onClick={() => handleCopyAddress(garage.address)}
          >
            <i className="bi bi-copy" aria-hidden="true" title="Copy address to clipboard"></i>
            <span className="sr-only">Copy address to clipboard</span>
          </button>
          <span className="text-sm text-green-800 ml-2">
            {addressCopied ? ' Address copied!' : ''}
          </span>
        </address>
        <p className="text-slate-600 mb-2">
          {garage.jurisdiction === 'city'
            ? 'Managed by City of Asheville'
            : 'Managed by Buncombe County'}
        </p>
        {garage.url && (
          <p className="mb-6">
            <a href={garage.url} className="text-link" target="_blank" rel="noopener noreferrer">
              {`${
                garage.jurisdiction === 'city' ? 'City of Asheville' : 'Buncombe County'
              } parking information`}
              <span className="sr-only">(opens in a new tab)</span>
              <i className="bi bi-box-arrow-up-right ml-1" aria-hidden="true"></i>
            </a>
          </p>
        )}

        <div className="flex items-baseline gap-1 border border-wp-blue-dark/20 rounded bg-wp-blue-light px-4 py-2 w-max">
          <div className="text-3xl font-light">{garage.available}</div>
          <div>available spaces</div>
        </div>
      </header>

      <div className="mb-6">
        <div className="w-full h-128">
          <MapContainer
            center={garage.coords}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: '100%' }}
            gestureHandling={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <Marker
              position={garage.coords}
              eventHandlers={{
                add: (e) => {
                  e.target.openPopup();
                },
              }}
            >
              <Popup>
                <div className="text-center">
                  <span className="block text-sm my-1">{garage.name} Parking</span>
                  <span className="block text-slate-600">{garage.address.split(',')[0]}</span>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {(!isAndroid || (isAndroid && !isWebView)) && (
        <div>
          <a
            href={`https://maps.google.com/?saddr=Current+Location&daddr=${garage.address}`}
            target="_blank"
            className="w-full bg-wp-blue-dark hover:bg-wp-blue-dark/80 focus:bg-wp-blue-dark/80 active:bg-wp-blue-dark/80 text-white font-semibold text-xl py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-blue-200 shadow-lg"
          >
            <i className="bi bi-signpost-split" aria-hidden="true"></i>Open in Maps
          </a>
        </div>
      )}
    </div>
  );
}

export default GaragePage;
