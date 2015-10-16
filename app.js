//instatiate an AngularJS module and inject an dependancy modules
var app = angular.module('app', []);
 
//Configure application states and routes
app.config(function () {
    
    // $urlRouterProvider.when('/topics', '/topics/list');
      
  });//END config

app.controller('AppCtrl', ['$scope', '$http',
 function ($scope, $http) {
    $scope.geolocationAllowed = true;
    $scope.usersPosition = "";
    var geolocationCallback = function(position){
        $scope.usersPosition = position.coords.latitude + "," + position.coords.longitude;
        $scope.$apply();
        console.log($scope.usersPosition);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geolocationCallback);
    } else {
        $scope.geolocationAllowed = false;
    }
    $scope.decks = [];
    $http({method : 'GET', url : 'https://s3.amazonaws.com/asheville-parking-decks/spaces.json'})
          //callbacks
          .success(function(data, status, headers, config){
            $scope.decks = data.decks;
            console.log($scope.decks);
          })
          .error(function(error){
              console.log('Error querying feature service.');
              console.log(error);
          });

    $scope.onClickGetGoogleDirections = function(){

    }

}]);
