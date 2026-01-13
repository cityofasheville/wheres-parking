import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from 'react-leaflet';
import PopupFocusHandler from './PopupFocusHandler';
import 'leaflet-gesture-handling';

function GarageMap({ garages }) {
  return (
    <>
      <p className="sr-only max-w-screen-sm mx-auto px-0 my-2">
        <i className="bi bi-info-circle mr-1" aria-hidden="true"></i>Click on a parking deck below
        for additional information.
      </p>
      <figure className="">
        <div className="w-full h-128">
          <MapContainer
            center={[35.59507694605827, -82.55298520128827]}
            zoom={16}
            scrollWheelZoom={true}
            style={{ height: '100%' }}
            gestureHandling={true}
          >
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            /> */}
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {/* <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles courtesy of <a href="http://www.openstreetmap.bzh/" target="_blank">Breton OpenStreetMap Team</a>'
              url="https://tile.openstreetmap.bzh/br/{z}/{x}/{y}.png"
            /> */}
            <PopupFocusHandler />
            {garages.map((garage) => (
              <Marker
                key={garage.slug}
                position={{ lat: garage.coords[0], lng: garage.coords[1] }}
                title={garage.name}
              >
                <Tooltip offset={[0, 0]} opacity={1} permanent style={{ borderRadius: '.5rem' }}>
                  <span className="text-lg">{garage.available}</span>
                </Tooltip>
                <Popup>
                  <div className="max-w-xs mt-0 py-2">
                    <div className="text-xl">{garage.name}</div>
                    <address className="text-sm text-slate-600 not-italic mb-2">
                      {garage.address}
                    </address>

                    <div className="flex items-center justify-between gap-2">
                      <span className="text-lg font-medium text-green-700">
                        {garage.available} spots open
                      </span>
                      <a href={`/${garage.slug}`} className="text-blue-600 text-sm hover:underline">
                        View Details
                      </a>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
        <figcaption className="sr-only">
          Map showing City of Asheville parking garage locations.
        </figcaption>
      </figure>
    </>
  );
}

export default GarageMap;
