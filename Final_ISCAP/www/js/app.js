// ISCAP App

/* global angular cordova StatusBar */

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'ISCAP' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'ISCAP.controllers' is found in controllers.js
// 'ISCAP.services' is found in services.js
angular.module('ISCAP', ['ionic', 'ISCAP.controllers', 'ISCAP.services', 'firebase', 'ui.calendar'])

// https://github.com/firebase/angularfire/blob/master/docs/quickstart.md

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

/* Configure states */
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
  /* Parent state */
  .state('iscap', {
    url: '/iscap',
    abstract: true,
    templateUrl: 'views/menu/menu.html',
    controller: 'AppCtrl'
  })
  
  /* Initial login state */
  .state('iscap.login-init', {
    url: '/login-init',
    views: {
      'menuContent': {
        templateUrl: 'views/login/login-init.html',
        controller: 'LoginCtrl'
      }
    }
  })
  
  /* State to display after login */
  .state('iscap.welcome', {
    url: '/welcome',
    views: {
      'menuContent': {
        templateUrl: 'views/welcome/welcome.html'
      }
    }
  })

  /* Begin left menu */
  .state('iscap.calendar', {
    url: '/calendar',
    views: {
      'menuContent': {
        templateUrl: 'views/calendar/calendar.html',
        controller: 'CalendarController'
      }
    }
  })

  .state('iscap.announcements', {
    url: '/announcements',
    views: {
      'menuContent': {
        templateUrl: 'views/announcements/announcements.html',
        controller: 'AnnouncementsCtrl'
      }
    }
  })
  .state('iscap.announcement-detail', {
    url: '/announcements/:announcementId',
    views: {
      'menuContent': {
        templateUrl: 'views/announcements/announcement-detail.html',
        controller: 'AnnouncementDetailCtrl'
      }
    }
  })
  .state('iscap.announcement-create', {
    url: '/announcements/announcement-create',
    views: {
      'menuContent': {
        templateUrl: 'views/announcements/announcement-create.html'
        //controller: 'AnnouncementDetailCtrl'
      }
    }
  })
  
  .state('iscap.test', {
    url: '/test',
    views: {
      'menuContent': {
        templateUrl: 'views/test/test.html',
        controller: 'testappController'
      }
    }
  })
  
  /*
  .state('iscap.thread', {
    url: '/thread',
    views: {
      'menuContent': {
        templateUrl: 'views/announcements/thread.html'
      }
    }
  })
  */
  
  .state('iscap.directory', {
    url: '/directory',
    views: {
      'menuContent': {
        templateUrl: 'views/directory/directory.html'
        //controller: 'DirectoryCtrl'
      }
    }
  })
  .state('iscap.directory-detail', {
    url: '/directory/:listingId',
    views: {
      'menuContent': {
        templateUrl: 'views/directory/directory-detail.html'
        //controller: 'DirectoryDetailCtrl'
      }
    }
  })
  
  .state('iscap.maps', {
    url: '/maps',
    views: {
      'menuContent': {
        templateUrl: 'views/maps/maps.html',
        //controller: 'WeatherServiceController'
      }
    }
  })
  
  .state('iscap.lostandfound', {
    url: '/lostandfound',
    views: {
      'menuContent': {
        templateUrl: 'views/lostandfound/lostandfound.html'
      }
    }
  })
  
  .state('iscap.faq', {
    url: '/faq',
    views: {
      'menuContent': {
        templateUrl: 'views/faq/faq.html'
      }
    }
  })
  
  /*
  .state('iscap.sessions', {
    url: '/sessions',
    views: {
      'menuContent': {
        templateUrl: 'views/sessions.html',
        controller: 'SessionsCtrl'
      }
    }
  })

  .state('iscap.single', {
    url: '/sessions/:sessionId',
    views: {
      'menuContent': {
        templateUrl: 'views/session.html',
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
          templateUrl: 'views/account/account.html' 
        }
      }
    })
    
    .state('iscap.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'views/login/login.html' 
      }
    }
  });
  /* End right menu */
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/iscap/login');
});

// Retrieve Firebase Messaging object.
/* global firebase */
      const messaging = firebase.messaging();
      var database = firebase.database();
      messaging.requestPermission()
      .then(function() {
        console.log('Notification permission granted.')
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
        return messaging.getToken();
      })
      .then(function(token){
        console.log(token)
        firebase.database().ref().set({
          //user: name,
          token: token
        });
        //currentToken = token
      })
      .catch(function(err) {
        console.log('Unable to get permission to notify.', err)
      })
      /*.then(function(currentToken) {
        firebase.database().ref('users/' + userId).set({
          user: name,
          token: token
      });*/
      messaging.onMessage(function(payload){
        console.log('onMessage: ', payload)
      });
      
      
      // Get Instance ID token. Initially this makes a network call, once retrieved
  // subsequent calls to getToken will return from cache.
      /*messaging.getToken()
      .then(function(currentToken, $firebase) {
        if (currentToken) {
          sendTokenToServer(currentToken);
          updateUIForPushEnabled(currentToken);
        } else {
          // Show permission request.
          console.log('No Instance ID token available. Request permission to generate one.');
          // Show permission UI.
          updateUIForPushPermissionRequired();
          setTokenSentToServer(false);
        }
      })
      .catch(function(err) {
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
      });
      // Callback fired if Instance ID token is updated.
      messaging.onTokenRefresh(function() {
        messaging.getToken()
        .then(function(refreshedToken) {
          console.log('Token refreshed.');
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          setTokenSentToServer(false);
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
          // ...
        })
        .catch(function(err) {
          console.log('Unable to retrieve refreshed token ', err);
          showToken('Unable to retrieve refreshed token ', err);
        });
      });*/