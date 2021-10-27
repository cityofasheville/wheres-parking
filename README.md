# wheres-parking

Where’s Parking is a GitHub pages hosted React app. The app makes a GET request to static JSON files in Amazon S3 buckets every 10 seconds to get fresh data. The JSON files for the Buncombe County garages are updated every minute by the County's parking vendor. The JSON files on S3 for the City of Asheville garages are created and updated by a NodeJS script running on coa-gis-fme1. That script reads a file from //coa-parking-app1/Count/webcount.dat and converts the parking deck data in the file into JSON, writes the JSON data to a file (spaces.json) and then pushes that JSON to S3. The NodeJS script itself is launched by parking-parser.bat which is called by the Windows task scheduler every 15 minutes. The file parking-parser.bat launches the node app using forever to keep it running. Check the task scheduler to get the location of the script in the FME server.

Backend Code: https://github.com/cityofasheville/parking-data-parser 

Where's Parking site: http://cityofasheville.github.io/wheres-parking/ (it's served from the gh-pages branch of this repo)

It is (NOT?) embedded in the City’s website here: http://www.ashevillenc.gov/Departments/ParkingServices/FindParking.aspx

You can grab the feeds from these AWS S3 buckets:

[https://s3.amazonaws.com/asheville-parking-decks/spaces.json](https://s3.amazonaws.com/asheville-parking-decks/spaces.json)

[https://s3.amazonaws.com/bc-parking-decks/164College](https://s3.amazonaws.com/bc-parking-decks/164College)

[https://s3.amazonaws.com/bc-parking-decks/40Coxe](https://s3.amazonaws.com/bc-parking-decks/40Coxe)
