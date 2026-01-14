# wheres-parking

## Overview

Where’s Parking is a React app hosted with AWS Amplify. The app makes GET requests on an interval to fetch a static JSON file in an Amazon S3 bucket to get fresh parking data.

This static JSON file is regularly updated by the [parking-data-parser](https://github.com/cityofasheville/parking-data-parser) Lambda function, consolidating data from City and County garages.

## URLs

Backend Code: https://github.com/cityofasheville/parking-data-parser

Where's Parking website: https://wheresparking.ashevillenc.gov

Where's Parking is embedded in the Asheville App.

Where's Parking is also embedded in the City’s website here: https://www.ashevillenc.gov/service/find-real-time-parking-in-parking-garages/

## Data Locations

### Consolidated JSON with all data (all-spaces.json)

This file is produced by the [parking-data-parser](https://github.com/cityofasheville/parking-data-parser) Lambda function and is available at [https://s3.amazonaws.com/avl-parking-decks/all-spaces.json](https://s3.amazonaws.com/avl-parking-decks/all-spaces.json) (custom-asheville). The readme in the parking-data-parser has more information about our parking data sources.

#### Shape of consolidated data

```json
[
  [
    {
      "name": "College Street",
      "slug": "college-street",
      "address": "164 College St, Asheville, NC 28801",
      "coords": [35.597220568749506, -82.54918944554281],
      "available": 175,
      "url": "https://www.buncombenc.gov/673/Public-Parking",
      "jurisdiction": "county"
    }
  ]
]
```

## Deploying

This is deployed on AWS Amplify on the main branch. Changes to the main branch will automatically redeploy the frontend app. The previous github pages deployment still exists at http://cityofasheville.github.io/wheres-parking/, but is being redirected to the new site.
