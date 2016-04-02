//instatiate an AngularJS module and inject an dependancy modules
var app = angular.module('app', []);
 
//Configure application states and routes
app.config(function () {});//END config

app.controller('AppCtrl', ['$scope', '$http',
 function ($scope, $http) {

    //Parking deck spaces data
    $scope.decks = [];

    var getDataFromS3 = function(){
      $http({method : 'GET', url : 'https://s3.amazonaws.com/asheville-parking-decks/spaces.json'})
          //callbacks
          .success(function(data, status, headers, config){
            $scope.decks = data.decks;
          })
          .error(function(error){
              console.log('Error querying feature service.');
              console.log(error);
          });
    }

    getDataFromS3();

    setInterval(getDataFromS3, 10000);

}]);
