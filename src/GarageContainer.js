import React, { useState, useEffect } from 'react';
import { useTheme } from './ThemeContext';
import GarageCard from './GarageCard';

const fetchGarageData = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch data from ${url}:`, error);
        return null;
    }
};

const GarageContainer = ({ setHoveredGarage }) => {
    const { theme } = useTheme();
    const [cityGarages, setCityGarages] = useState([]);
    const [countyGarages, setCountyGarages] = useState([]);

    const updateGarageData = async () => {
        const cityData = await fetchGarageData('https://s3.amazonaws.com/avl-parking-decks/spaces.json');
        const collegeData = await fetchGarageData('https://s3.amazonaws.com/bc-parking-decks/164College');
        const coxeData = await fetchGarageData('https://s3.amazonaws.com/bc-parking-decks/40Coxe');

        if (cityData) setCityGarages(cityData.decks || []);
        if (collegeData && coxeData) {
            setCountyGarages([
                {
                    name: collegeData.decks?.[0]?.name || '164 College Street',
                    available: collegeData.decks?.[0]?.available || 'Unable to determine',
                    coords: collegeData.decks?.[0]?.coords || [35.591976, -82.545413],
                },
                {
                    name: coxeData.decks?.[0]?.name || '40 Coxe Avenue',
                    available: coxeData.decks?.[0]?.available || 'Unable to determine',
                    coords: coxeData.decks?.[0]?.coords || [0, 0],
                }
            ]);
        }
    };

    useEffect(() => {
        updateGarageData();
        const interval = setInterval(updateGarageData, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedGarages = [...cityGarages, ...countyGarages].sort((a, b) => a.name.localeCompare(b.name));

    const headerStyle = {
        color: theme === 'dark' ? '#bdc1c6' : 'inherit',
        maxWidth: '600px',
    };

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <div className="d-flex justify-content-between mb-2 w-100" style={headerStyle}>
                <strong>Garage name</strong>
                <strong>Open spaces</strong>
            </div>
            <div className="w-100 d-flex flex-column align-items-stretch" style={{ maxWidth: '600px' }}>
                {sortedGarages.map((deck) => (
                    <GarageCard
                        key={deck.name}
                        name={deck.name}
                        available={deck.available}
                        coords={deck.coords}
                        // Passing onMouseEnter and onMouseLeave handlers
                        onMouseEnter={() => {
                            console.log("Mouse entered", deck);
                            setHoveredGarage(deck);
                        }}
                        onMouseLeave={() => {
                            console.log("Mouse left", deck);
                            setHoveredGarage(null);
                        }}

                    />
                ))}
            </div>
        </div>
    );
};

export default GarageContainer;
