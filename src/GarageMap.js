import { useState, useEffect } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';

function GarageMap({ garages }) {
  const [selectedGarage, setSelectedGarage] = useState(null);

  const cleanMapStyles = [
    {
      featureType: 'administrative.neighborhood',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'poi',
      stylers: [{ visibility: 'off' }],
    },
  ];

  return (
    <>
      <p className="sr-only max-w-screen-sm mx-auto px-0 my-2">
        <i className="bi bi-info-circle mr-1" aria-hidden="true"></i>Click on a parking deck below
        for additional information.
      </p>
      <figure className="">
        <APIProvider
          apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
          onLoad={() => console.log('Maps API has loaded.')}
        >
          <Map
            style={{ width: '100%', height: '540px' }}
            defaultCenter={{ lat: 35.59507694605827, lng: -82.55298520128827 }}
            defaultZoom={15}
            disableDefaultUI={false}
            controlSize={35}
            styles={cleanMapStyles}
            onClick={() => setSelectedGarage(null)}
          >
            {garages.map((garage) => (
              <Marker
                key={garage.slug}
                position={{ lat: garage.coords[0], lng: garage.coords[1] }}
                title={garage.name}
                onClick={(e) => {
                  e.stop();
                  setSelectedGarage(garage);
                }}
              />
            ))}
            {selectedGarage && (
              <InfoWindow
                position={{ lat: selectedGarage.coords[0], lng: selectedGarage.coords[1] }}
                // Important: Handle the "X" button in the popup
                onCloseClick={() => setSelectedGarage(null)}
                pixelOffset={[0, -30]}
              >
                <div className="max-w-xs mt-0 py-2 border-t">
                  <div className="text-xl">{selectedGarage.name}</div>
                  <address className="text-sm text-slate-600 not-italic mb-2">
                    {selectedGarage.address}
                  </address>

                  <div className="flex items-center justify-between gap-2">
                    <span className="text-lg font-medium text-green-700">
                      {selectedGarage.available} spots open
                    </span>
                    <a
                      href={`/${selectedGarage.slug}`}
                      className="text-blue-600 text-sm hover:underline"
                    >
                      View Details
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
        <figcaption className="sr-only">
          Map showing City of Asheville parking garage locations.
        </figcaption>
      </figure>
    </>
  );
}
export default GarageMap;
