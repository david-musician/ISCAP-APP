// ISCAP App

/* global angular cordova StatusBar */

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ISCAP' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ISCAP.controllers' is found in controllers.js
// 'ISCAP.services' is found in services.js
angular.module('ISCAP', ['ionic', 'ISCAP.controllers', 'ISCAP.services'])

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

/* 
 * Once user authentication and roles are working we will use this instead of
 * the above .run code:

.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
  $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
    if (!AuthService.isAuthenticated()) {
      console.log(next.name);
      if (next.name !== 'outside.login' && next.name !== 'outside.register') {
        event.preventDefault();
        $state.go('outside.login');
      }
    }
  });
  
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

 */

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
  .state('iscap.events', {
    url: '/events',
    views: {
      'menuContent': {
        templateUrl: 'templates/events.html'
      }
    }
  })

  .state('iscap.announcements', {
    url: '/announcements',
    views: {
      'menuContent': {
        templateUrl: 'templates/announcements.html',
        controller: 'AnnouncementsCtrl'
      }
    }
  })
  /* This needs to be fixed */
  .state('iscap.announcement-detail', {
    url: '/announcements/:announcementId',
    views: {
      'menuContent': {
        templateUrl: 'templates/announcement-detail.html',
        controller: 'AnnouncementDetailCtrl'
      }
    }
  })
  
  .state('iscap.directory', {
    url: '/directory',
    views: {
      'menuContent': {
        templateUrl: 'templates/directory.html'
      }
    }
  })
  
  .state('iscap.maps', {
    url: '/maps',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps.html',
        /*controller: 'WeatherServiceController'*/
      }
    }
  })
  
  .state('iscap.lostandfound', {
    url: '/lostandfound',
    views: {
      'menuContent': {
        templateUrl: 'templates/lostandfound.html'
      }
    }
  })
  
  .state('iscap.faq', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'templates/faq.html'
      }
    }
  })
  
  .state('iscap.thread', {
    url: '/thread',
    views: {
      'menuContent': {
        templateUrl: 'templates/thread.html'
      }
    }
  })
  
  /*
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
  */
    /* End left menu*/
    
    /* Begin right menu */
    .state('iscap.account', {
      url: '/account',
      views: {
        'menuContent': {
          templateUrl: 'templates/account.html' 
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
  $urlRouterProvider.otherwise('/iscap/welcome');
});
