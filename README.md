# wheres-parking

Where’s Parking is a React app now hosted with AWS Amplify. The app makes a GET request to static JSON files in Amazon S3 buckets every 10 seconds to get fresh data. The JSON files for the Buncombe County garages are updated every minute by the County's parking vendor. The JSON files on S3 for the City of Asheville garages are loaded by the Lambda parking-data-parser (custom-asheville) from the Parking Logix API. https://github.com/cityofasheville/parking-data-parser

Backend Code: https://github.com/cityofasheville/parking-data-parser 

Where's Parking site: https://wheresparking.ashevillenc.gov

It is embedded in the City’s website here: https://www.ashevillenc.gov/service/find-real-time-parking-in-parking-garages/

You can grab the feeds from these AWS S3 buckets:

[https://s3.amazonaws.com/avl-parking-decks/spaces.json](https://s3.amazonaws.com/avl-parking-decks/spaces.json)  (custom-asheville) 

[https://s3.amazonaws.com/bc-parking-decks/164College](https://s3.amazonaws.com/bc-parking-decks/164College)  (enterprise-asheville) 

[https://s3.amazonaws.com/bc-parking-decks/40Coxe](https://s3.amazonaws.com/bc-parking-decks/40Coxe)   (enterprise-asheville)


## Deploying
This is deployed on AWS Amplify on the main branch.  To deploy new changes, make commits to main branch and Amplify will automatically redeploy.
