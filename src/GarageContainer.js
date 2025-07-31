import React, { Component } from 'react';
import GarageCard from './GarageCard';

class GarageContainer extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            city_garages: {
                decks: [],
            },
            county_garages: {
                decks: [],
            }
        };
    };

    getCityCounts() {
        fetch('https://s3.amazonaws.com/avl-parking-decks/spaces.json')
        .then((response) => response.json())
        .then((responseJSON) => {
            const modifiedData = {
                ...responseJSON, 
                //Rankin Ave will be closed for 1 month starting 8/1
                //<start> Comment this section when it reopens
                decks: responseJSON.decks.map(garage => {
                    if (garage.name === "Rankin Ave Garage") {
                        return { ...garage, available: '0' };
                    }
                    return garage;
                })
                //<end> Comment this section when it reopens
            };
            this.setState({
                city_garages: modifiedData, 
            });
        })
        .catch(error => console.log(error));
        
    }

    getCountyCounts() {
        fetch('https://s3.amazonaws.com/bc-parking-decks/164College')
        .then((college) => college.json())
        .then((collegeJSON) => {
            fetch('https://s3.amazonaws.com/bc-parking-decks/40Coxe')
            .then((coxe) => coxe.json())
            .then((coxeJSON) => {
                this.setState({
                    county_garages: {
                        decks: [{
                            name: collegeJSON.decks && collegeJSON.decks.length > 0 ? 'College Street' : '164 College Street', //Replacing collegeJSON.decks[0].name with 'College Street'
                            available: collegeJSON.decks && collegeJSON.decks.length > 0 ? collegeJSON.decks[0].available : 'Unable to determine',
                            coords: collegeJSON.decks && collegeJSON.decks.length > 0 ? collegeJSON.decks[0].coords : [35.591976,-82.545413],
                        },
                        {
                            name: coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].name : '40 Coxe Avenue',
                            available: coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].available : 'Unable to determine',
                            coords: coxeJSON.decks && coxeJSON.decks.length > 0 ? coxeJSON.decks[0].coords : [0, 0],
                        }
                        ]
                    },
                });
            })
            .catch(error => console.log(error));
        })
        .catch(error => console.log(error));
    }

    sortGarages(city, county) {
        const combined = city.concat(county);
        combined.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        return combined;
    }

    componentDidMount() {
        this.getCityCounts();
        this.getCountyCounts();
        this.interval = setInterval(() => {
            this.getCityCounts();
            this.getCountyCounts();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div>
                <div className="GarageContainer-data-labels">
                    <span>Garage name</span>
                    <span>Open spaces</span>
                </div>
                <div>
                    {this.sortGarages(this.state.city_garages.decks, this.state.county_garages.decks).map(deck => <GarageCard name={deck.name} key={deck.name} available={deck.available} coords={deck.coords} />)}
                </div>
            </div>
        );
    }
};

export default GarageContainer;