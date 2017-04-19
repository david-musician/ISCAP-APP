/* global angular */
angular.module('ISCAP.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicNavBarDelegate) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  $scope.username = "Person";

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
  
  $ionicNavBarDelegate.showBackButton(false);
  
  // Redirect the use once logged in
  /*
  $scope.redirect = function() {
    try {
      $window.location.href = 'templates/welcome.html';
      console.log("User is logged in!");
    } catch(err) {
      console.log(err);
    }
  };
  */
})

/* Login controller, currently broken
.controller('LoginCtrl', function($scope, $http, $log, $state) {

  $scope.login = function() {
    
    
    $state.go("welcome");
    /*

    var postData = {

      "username": $scope.username,
      "password": $scope.password
    };

    $http.post('#/iscap/welcome', postData)
      .success(function(data) {
        console.log("SUCCESS");
        console.log("Username: " + $scope.username + "   -   Password: " + $scope.password);
        $location.path("iscap/welcome");
      })
      .error(function(data) {
        console.log("ERROR");
      });
      * /

  };
})
*/

.controller('SessionsCtrl', function($scope) {
  $scope.sessions = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('SessionsCtrl', function($scope, $stateParams) {
})

.controller('AnnouncementsCtrl', function($scope, Announcements) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.announcements = Announcements.all();
  $scope.remove = function(announcement) {
    Announcements.remove(announcement);
  };
})

.controller('AnnouncementDetailCtrl', function($scope, $stateParams, Announcements) {
  $scope.announcement = Announcements.get($stateParams.announcementId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableNotifications: true
  };
})

.controller("WeatherServiceController", ["$scope", "$http", 
    "GoogleGeolocationService", "DarkSkyWeatherService",
    function($scope, $http, 
             GoogleGeolocationService,
             DarkSkyWeatherService){
 
        var wsc = this;
        
        wsc.fahrenheitTemp = true;
        wsc.celsiusTemp = false;
        wsc.fahrenheitDewpoint = true;
        wsc.celsiusDewpoint = false;
        wsc.windMPH = true;
        wsc.windKnots = false;
        
        wsc.selected_lat = 0;
        wsc.selected_lon = 0;
    
        //key: sdfgsde5dfgsdfg34tsdfg

        //App name    
        wsc.app_name = "Weather App";
    
        wsc.options = 
        [
            {
                name: "Celsius",
            }
        ];
        
        wsc.cities = 
        [
            {
                name: "Amarillo",
                url_name: "Amarillo",
                state: "TX",
                lat: 0,
                lon: 0
            }, 
            {
                name: "Anchorage",
                url_name: "Anchorage",
                state: "AK",
                lat: 0,
                lon: 0
            },
            {
                name: "Denver",
                url_name: "Denver",
                state: "CO",
                lat: 0,
                lon: 0
            }
        ];
        
        wsc.getLatLonForSelected = function(){
            GoogleGeolocationService.geoLocate(wsc.selected_city)
                .then(function(res){
                    wsc.selected_lat = res.data.results[0].geometry.location.lat;
                    wsc.selected_lon = res.data.results[0].geometry.location.lng;
                    
                    wsc.selected_city.lat = wsc.selected_lat;
                    wsc.selected_city.lon = wsc.selected_lon;
                    
                    //var google_static_maps_key = "AIzaSyAVIugWFEfJlG9Y5HS-kkkoQISjDNWWDtM";
                    var google_static_maps_key = "AIzaSyC4tT_4VUXDbiSLz_AJVuTLDOzewjj7O9A";
                    
                    wsc.google_static_maps_url = "https://maps.googleapis.com/maps/api/staticmap?center=" +
                                                 wsc.selected_lat + "," +
                                                 wsc.selected_lon + 
                                                 "&zoom=10&size=600x300&key=" +
                                                 google_static_maps_key;
                                                 
                    console.log("Google Static Map API URL");
                    console.log(wsc.google_static_maps_url);                        
                    
                    //console.log(res);
                    
                    wsc.getCurrentConditions();        
                    
                })
                .catch(function(err){
                    console.log(err);
                });
        };
        
        wsc.getCurrentConditions = function(){
            DarkSkyWeatherService.getCurrentConditions(wsc.selected_city)
                .then(function(res){
                    console.log(res);
                    
                    // Get weather stuff
                    wsc.celsius = ((res.data.currently.temperature - 32) * 5) / 9;
                    wsc.ds_dpcelsius = ((res.data.currently.temperature - 32) * 5) / 9;
                    
                    wsc.ds_observation_time = new Date(res.data.currently.time * 1000);
                    wsc.ds_temperature      = res.data.currently.temperature;
                    wsc.ds_celsius          = wsc.celsius.toFixed(2);
                    wsc.ds_dewpoint         = res.data.currently.dewPoint;
                    wsc.ds_dpcelsius        = wsc.ds_dpcelsius.toFixed(2);
                    wsc.ds_windBearing      = res.data.currently.windBearing;
                    wsc.ds_windSpeed        = res.data.currently.windSpeed;
                    wsc.ds_summary          = res.data.currently.summary;
                })
                .catch(function(err){
                    console.log(err);
                });
        };
        
        wsc.selected_city = wsc.cities[0];
        wsc.getLatLonForSelected();
        //wsc.getCurrentConditions();            

        
}])
.factory('GoogleGeolocationService', ['$sce', '$http', 
    function($sce, $http){
        //https://docs.angularjs.org/api/ng/service/$sce
        
        //create an empty object
        var geolocationService = {};
        
        //Google Maps Geocoding API key   
        var key = "AIzaSyC4tT_4VUXDbiSLz_AJVuTLDOzewjj7O9A";
        
        geolocationService.geoLocate = function(location){

            var address = "+" + location.name + ",+" + location.state;
            var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" +
                      address + "&key=" + key;

            var trustedurl = $sce.trustAsResourceUrl(url);
            return $http.get(trustedurl);
        };
        
        return geolocationService;            
        
    }])
.factory('DarkSkyWeatherService',['$sce', '$http', 
    function($sce, $http){
        //work happens here
        
        var darkSkyWeatherService = {};
        
        //DarkSky API key
        var key = "6c8b305547beae413df14241f389aea7";
        
        darkSkyWeatherService.getCurrentConditions = function(location){
            
            var url = "https://api.darksky.net/forecast/" +
                      key + "/" + location.lat + "," + location.lon;
                      
            console.log("DarkSky API URL:");
            console.log(url);
            
            var trustedurl = $sce.trustAsResourceUrl(url);
            return $http.jsonp(trustedurl, {jsonpCallbackParam: 'callback'});
            
        };
        
        return darkSkyWeatherService;
    }
])

.directive('myConditions', ['$sce', function($sce){
    
    return {
        // This is defined in https://docs.angularjs.org/guide/directive
        // This is so we can say which roles the directive will perform
        restrict: 'E',
        
        /* We allow the directive to see the scope, otherwise it won't be
         * able to see the variables in the controller
         */
        scope: true,
        
        //Reference the template url
        templateUrl: $sce.trustAsResourceUrl('templates/currentConditions.html')
    };
}]);