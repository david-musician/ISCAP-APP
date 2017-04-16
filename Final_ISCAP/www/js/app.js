// ISCAP App

/* global angular cordova StatusBar */

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ISCAP' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ISCAP.controllers' is found in controllers.js
angular.module('ISCAP', ['ionic', 'ISCAP.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  /* Parent state */
  .state('iscap', {
    url: '/iscap',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  /* Initial login state */
  .state('iscap.login-init', {
    url: '/login-init',
    views: {
      'menuContent': {
        templateUrl: 'templates/login-init.html',
        controller: 'LoginCtrl'
      }
    }
  })
  
  /* State to display after login*/
  .state('iscap.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'templates/welcome.html'
      }
    }
  })

  /* Begin left menu */
  .state('iscap.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('iscap.browse', {
    url: '/browse',
    views: {
      'menuContent': {
        templateUrl: 'templates/browse.html'
      }
    }
  })
  
  .state('iscap.sessions', {
    url: '/sessions',
    views: {
      'menuContent': {
        templateUrl: 'templates/sessions.html',
        controller: 'SessionsCtrl'
      }
    }
  })

  .state('iscap.single', {
    url: '/sessions/:sessionId',
    views: {
      'menuContent': {
        templateUrl: 'templates/session.html',
        controller: 'SessionCtrl'
      }
    }
  })
    /* End left menu*/
    
    /* Begin right menu */
    .state('iscap.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html' 
        }
      }
    })
    
    .state('iscap.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html' 
      }
    }
  });
  /* End right menu */
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/iscap/login-init');
});
