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

    return (
        <div>
            <div className="GarageContainer-data-labels">
                <span>Garage name</span>
                <span>Open spaces</span>
            </div>
            <div>
                {sortedGarages.map(deck => (
                    <GarageCard
                        name={deck.name}
                        key={deck.name}
                        available={deck.available}
                        coords={deck.coords}
                    />
                ))}
            </div>
        </div>
    );
};

export default GarageContainer;