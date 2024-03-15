import React from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
    width: '100%', // Match parent width
    height: '100%' // Match parent height
};

const center = {
    lat: 35.5951,
    lng: -82.5515
};

const MyMap = ({ garages, highlightedGarage, onCloseInfoWindow }) => {
    return (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <div style={{ maxWidth: '600px', height: '100%' }}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {garages.map(garage => (
                        <Marker
                            key={garage.name}
                            position={{ lat: garage.coords[0], lng: garage.coords[1] }}
                        />
                    ))}
                    {highlightedGarage && (
                        <InfoWindow
                            position={{ lat: highlightedGarage.coords[0], lng: highlightedGarage.coords[1] }}
                            onCloseClick={onCloseInfoWindow}
                        >
                            <div className="info-window-content">
                                <h2 className="info-window-title">{highlightedGarage.name}</h2>
                                <p className="info-window-body">Available Spaces: {highlightedGarage.available}</p>
                            </div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
        </LoadScript>
    );
};

export default MyMap;
