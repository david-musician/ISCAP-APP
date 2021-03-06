/* global angular firebase */
angular.module('ISCAP.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicNavBarDelegate, $http, $ionicPush, $location) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  /* BEGIN LOGIN */
  // Form data for the login modal
  $scope.loginData = {
    username: "username@example.com",
    password: "********"
  };

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('views/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Login Modal not needed as it is its own view now
  /* Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };
  */

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ", " + errorMessage);
      // ...
    });
    $scope.pushNotification();
  };
  
  $scope.doSignup = function() {
    firebase.auth().createUserWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ", " + errorMessage);
      // ...
    });
  };
  
  $scope.logout = function(){
    firebase.auth().signOut().then(function() {
      console.log("User signed out");
      $scope.redirectLogout();
    }).catch(function(error) {
      console.log(error);
    });
  };
  
  // Redirect the user once logged out
  $scope.redirectLogout = function() {
    try {
      $location.path('views/login/login.html');
      console.log("User is logged out");
    } catch(err) {
      console.log(err);
    }
  };
  /* END LOGIN */

  /* Push Notifications */
  $scope.pushNotification = function() {
   $http({
          url:'https://fcm.googleapis.com/fcm/send/segments?appkey=AAAAfkKjcz0:APA91bE-lHMab644-_TJeVgLlyprarA_I_MhCy9XnfCbhF9J5ue8G3z_RSHi3Xyzj3lw0j65iI7-F4TPQiIfD0DO96_87OzEv19fwukDV-IvYI9SsNwwUKbKmpCgQshe7qzqHL-Bfg_c',
          
          method:'POST',
          data:{"status": "It works"},
          headers:{'Content-Type': 'application/json', 'Auth_Token': 'fKHVi_xWWm0:APA91bEP6PlLBKgpBemigHSiVsHsTmGmQFDjkKpfzpazyaSpelJSW2p62Im8_jLIT35FoZgYzTck6LIqKFaAt-_PHcComchMdi9wWRfFefi1TmfVK7ABlFxZPiQWiu6lOUeJgp5GTDB9'}
      }).success(function(data){
          console.log(data);
          alert("Success");
      });
  };
  
  /* Do not show the back button on the Welcome page */
  $ionicNavBarDelegate.showBackButton(false);
})

/* BEGIN CONTROLLERS */

/*.controller("SampleCtrl", function($scope, $firebaseArray) {
  /* version 1, simple call from database
  var ref = firebase.database().ref();
  // download the data into a local object
  $scope.data = $firebaseObject(ref);
  // putting a console.log here won't work
  */
  
  /* version 2, 3-way binding with $firebaseObject
  var ref = firebase.database().ref().child("data");
  // download the data into a local object
  var syncObject = $firebaseObject(ref);
  // synchronize the object with a three-way data binding
  // click on `index.html` above to see it used in the DOM!
  syncObject.$bindTo($scope, "data");
  */
  
  /* version 3, synchronized array
  var ref = firebase.database().ref().child("messages");
  // create a synchronized array
  // click on `index.html` above to see it used in the DOM!
  $scope.messages = $firebaseArray(ref);
  */
  
  /*
  var ref = firebase.database().ref('Other/Other');
  // create a synchronized array
  $scope.messages = $firebaseArray(ref);
  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText,
    });
    
    firebase.database().ref('Other/Other').push({
      announcement: "Hello World"
    });
    
    
  };
  // click on `index.html` above to see $remove() and $save() in action
})*/

/*.controller('SessionsCtrl', function($scope) {
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
})*/

.controller('AnnouncementsCtrl', function($scope, Announcements, myAnnouncements, $firebaseArray, $timeout) {
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
  
  $scope.messageSuccess = false;
  $scope.announcementCreated = "Announcement created successfully!";
  $scope.showCreateForm = false;
  $scope.announcementData = [];
  
  $scope.date = new Date().toString();
  
  $scope.announcement = {
    id: "",
    announcementTitle: "",
    name: 'Chair Person',
    date: $scope.date,
    category: "Category",
    link: "http://iscap.info/",
    text: "",
    face: "../img/profile-icon.png"
  };
  
  /*
  $scope.showFormToggle = function () {
    if ($scope.showCreateForm === true) {
      $scope.showCreateForm = false;
      console.log("showCreateForm: " + $scope.showCreateForm);
    } else {
      $scope.showCreateForm = true;
      console.log("showCreateForm: " + $scope.showCreateForm);
    }
  };
  */
  
  $scope.items = [{
      title: '1',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }];
  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleItem = function(item) {
    if ($scope.isItemShown(item)) {
      $scope.shownItem = null;
    } else {
      $scope.shownItem = item;
    }
  };
  $scope.isItemShown = function(item) {
    return $scope.shownItem === item;
  };
  
  $scope.addAnnouncement = function() {
    $scope.date = new Date().toString();
    $scope.timestamp = Math.round((new Date()).getTime() / 1000);
    
    // http://stackoverflow.com/questions/38768576/in-firebase-when-using-push-how-do-i-get-the-unique-id-and-store-in-my-databas
    // https://firebase.google.com/docs/database/web/read-and-write
    var myRef = firebase.database().ref('Other/Announcement');
    var key = myRef.push().key;
    
    var newData = {
      id: key,
      timestamp: $scope.timestamp,
      announcmentTitle: $scope.announcement.announcementTitle,
      name: $scope.announcement.name,
      date: $scope.announcement.date,
      category: $scope.announcement.category,
      link: $scope.announcement.link,
      text: $scope.announcement.text,
      face: $scope.announcement.face,
    };
    
    try {
      myRef.push(newData);
      console.log("Announcement created!");
      $scope.twasCreated();
      $timeout(function() {
        $scope.twasCreated();
      }, 3000);
    } catch(err) {
      console.log(err);
    }
    $scope.toggleItem();
  };
  
  $scope.twasCreated = function () {
    if ($scope.messageSuccess === true){
      $scope.messageSuccess = false;
    } else {
      $scope.messageSuccess = true;
    }
  };
  
  $scope.getAnnouncements = function() {
    
    var db = firebase.database();
    var ref = db.ref('Other/Announcement');
    ref.on("value", function(snapshot) {
      console.log(snapshot.val());
      $scope.announcementData = snapshot.val();
      //console.log($scope.announcementData);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });
  };
  
  $scope.myAnnouncements = myAnnouncements.all();
  
  $scope.getAnnouncements();
})

.controller('AnnouncementDetailCtrl', function($scope, $stateParams, Announcements, myAnnouncements) {
  $scope.announcement = Announcements.get($stateParams.announcementId);
  $scope.myAnnouncement = myAnnouncements.get($stateParams.announcementId);
})

/* Begin Directory */
.controller('DirectoryCtrl', function($scope, Listings) {
  $scope.listings = Listings.all();
  $scope.remove = function(listing) {
    Listings.remove(listing);
  };
})

.controller('DirectoryDetailCtrl', function($scope, $stateParams, Listings) {
  $scope.listing = Listings.get($stateParams.listingId);
})
/* End Directory */

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableNotifications: true,
    enableBio: false,
    bio: 'This is an important bio. Because it\'s about me',
    pfp: 'img/profile-icon.png'
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
        templateUrl: $sce.trustAsResourceUrl('views/maps/currentConditions.html')
    };
}])

.controller('footerCtrl', ['$scope', function($scope) {
  $scope.date = new Date();
}])

.directive('appFooter', function() {
  return {
    templateUrl: '/common/directives/app-footer/app-footer.html'
  };
});
