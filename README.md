# wheres-parking

## Overview

Where’s Parking is a React app hosted with AWS Amplify. The app makes a GET request to a static JSON file in an Amazon S3 bucket every 15 seconds to get fresh data. The JSON files for the Buncombe County garages are updated every minute by the County's parking vendor. These County JSON files are merged with data for the City of Asheville garages (via Parking Logix API) by the Lambda parking-data-parser (custom-asheville): https://github.com/cityofasheville/parking-data-parser. Data in the resulting consolidated JSON file feeds this frontend app.

## URLs

Backend Code: https://github.com/cityofasheville/parking-data-parser

Where's Parking site: https://wheresparking.ashevillenc.gov

It is embedded in the City’s website here: https://www.ashevillenc.gov/service/find-real-time-parking-in-parking-garages/

## Data Locations:

### Consolidated JSON with all data

[https://s3.amazonaws.com/avl-parking-decks/all-spaces.json](https://s3.amazonaws.com/avl-parking-decks/all-spaces.json) (custom-asheville)

### JSON with raw City data

[https://s3.amazonaws.com/avl-parking-decks/spaces.json](https://s3.amazonaws.com/avl-parking-decks/spaces.json) (custom-asheville)

### JSON with raw County data

[https://s3.amazonaws.com/bc-parking-decks/164College](https://s3.amazonaws.com/bc-parking-decks/164College) (enterprise-asheville)

[https://s3.amazonaws.com/bc-parking-decks/40Coxe](https://s3.amazonaws.com/bc-parking-decks/40Coxe) (enterprise-asheville)

## Deploying

This is deployed on AWS Amplify on the main branch. Changes to the main branch will automatically redeploy the frontend app. The previous github pages deployment still exists at http://cityofasheville.github.io/wheres-parking/, but is being redirected to the new site.
