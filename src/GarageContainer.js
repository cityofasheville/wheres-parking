import React, { useState, useEffect } from 'react';
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

const GarageContainer = () => {
    const [cityGarages, setCityGarages] = useState([]);
    const [countyGarages, setCountyGarages] = useState([]);

    useEffect(() => {
        const updateGarageData = async () => {
            const cityData = await fetchGarageData('https://s3.amazonaws.com/avl-parking-decks/spaces.json');
            const collegeData = await fetchGarageData('https://s3.amazonaws.com/bc-parking-decks/164College');
            const coxeData = await fetchGarageData('https://s3.amazonaws.com/bc-parking-decks/40Coxe');

            if (cityData) setCityGarages(cityData.decks || []);
            if (collegeData && coxeData) {
                setCountyGarages([
                    collegeData.decks?.[0] || { name: '164 College Street', available: 'Unable to determine', coords: [35.591976, -82.545413] },
                    coxeData.decks?.[0] || { name: '40 Coxe Avenue', available: 'Unable to determine', coords: [0, 0] },
                ]);
            }
        };
        updateGarageData();
        const interval = setInterval(updateGarageData, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedGarages = [...cityGarages, ...countyGarages].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="d-flex flex-column align-items-center my-4">
            <div className="d-flex justify-content-between text-muted mb-2 w-100" style={{ maxWidth: '600px' }}>
                <strong>Garage name</strong>
                <strong>Open spaces</strong>
            </div>
            <div className="w-100 d-flex flex-column align-items-stretch" style={{ maxWidth: '600px' }}>
                {sortedGarages.map(deck => (
                    <GarageCard
                        key={deck.name}
                        name={deck.name}
                        available={deck.available}
                        coords={deck.coords}
                    />
                ))}
            </div>
        </div>
    );
};

export default GarageContainer;
