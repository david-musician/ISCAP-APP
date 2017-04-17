/* global angular $state */
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
});
