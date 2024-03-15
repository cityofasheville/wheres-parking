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

    useEffect(() => {
        const updateGarageData = async () => {
            const urls = [
                'https://s3.amazonaws.com/avl-parking-decks/spaces.json',
                'https://s3.amazonaws.com/bc-parking-decks/164College',
                'https://s3.amazonaws.com/bc-parking-decks/40Coxe',
            ];
            const dataPromises = urls.map(url => fetchGarageData(url));
            Promise.all(dataPromises).then(results => {
                const cityData = results[0];
                const collegeData = results[1];
                const coxeData = results[2];

                if (cityData) setCityGarages(cityData.decks || []);
                if (collegeData && coxeData) {
                    setCountyGarages([
                        collegeData.decks?.[0] ? { ...collegeData.decks[0], name: '164 College Street' } : {},
                        coxeData.decks?.[0] ? { ...coxeData.decks[0], name: '40 Coxe Avenue' } : {},
                    ].filter(garage => garage.name)); // Filter out any undefined entries
                }
            });
        };

        updateGarageData();
        const interval = setInterval(updateGarageData, 10000);
        return () => clearInterval(interval);
    }, []);

    const sortedGarages = [...cityGarages, ...countyGarages].sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="container-fluid px-0 my-4">
            <div className="row no-gutters justify-content-center">
                <div className="col-12 col-md-10 col-lg-8">
                    <div className="d-flex justify-content-between mb-2" style={{ color: theme === 'dark' ? '#bdc1c6' : 'inherit', maxWidth: '600px', margin: '0 auto' }}>
                        <strong>Garage name</strong>
                        <strong>Open spaces</strong>
                    </div>
                    {sortedGarages.map(deck => (
                        <GarageCard
                            key={deck.name}
                            name={deck.name}
                            available={deck.available}
                            coords={deck.coords}
                            onMouseEnter={() => setHoveredGarage(deck)}
                            onMouseLeave={() => setHoveredGarage(null)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GarageContainer;
