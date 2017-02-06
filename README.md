# wheres-parking

Where’s Parking is a GitHub pages hosted AngularJS app. The app makes a GET request to a static JSON file in an Amazon S3 bucket every 10 seconds to get fresh data. The JSON file on S3 is created and updated by a NodeJS script running on coa-gis-fme1. That script reads a file from //coa-parking-app1/Count/webcount.dat and converts the parking deck data in the file into JSON, writes the JSON data to a file (spaces.json) and then pushes that JSON to S3. The NodeJS script itself is launched by parking-parser.bat which is called by the Windows task scheduler every 15 minutes. The file parking-parser.bat launches the node app using forever to keep it running. Check the task scheduler to get the location of the script in the FME server.

Backend Code: https://github.com/cityofasheville/parking-data-parser 

Where's Parking site: http://cityofasheville.github.io/wheres-parking/

It’s embedded in the City’s website here: http://www.ashevillenc.gov/Departments/ParkingServices/FindParking.aspx

You can grab the feed from this AWS S3 bucket:

[https://s3.amazonaws.com/asheville-parking-decks/spaces.json](https://s3.amazonaws.com/asheville-parking-decks/spaces.json)

Real time updates on available parking spots in parking decks for the City of Asheville
