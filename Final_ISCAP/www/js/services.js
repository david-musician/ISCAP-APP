/* global angular */
angular.module('ISCAP.services', [])

/* Authentication factory, stored in local storage
.factory('Authentication', function() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });
})
*/

.factory('Announcements', function() {
  // Might use a resource here that returns a JSON array

  // Test data
  var announcements = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return announcements;
    },
    remove: function(announcement) {
      announcements.splice(announcements.indexOf(announcement), 1);
    },
    get: function(announcementId) {
      for (var i = 0; i < announcements.length; i++) {
        if (announcements[i].id === parseInt(announcementId)) {
          return announcements[i];
        }
      }
      return null;
    }
  };
})

.factory('Directory', function() {
  // Test data
  var listings = [{
    id: 0,
    name: 'Ben Sparrow',
    description: 'Chairman',
    biography: 'Is a Chairman',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    description: 'Chairman',
    biography: 'Is a Chairman, too',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    description: 'Chairman',
    biography: 'Boat buyer',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    description: 'Chairman',
    biography: 'Not a govenor, is a chairman',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    description: 'Chairman',
    biography: 'I Love ice cream',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return listings;
    },
    remove: function(listing) {
      listings.splice(listings.indexOf(listing), 1);
    },
    get: function(listingId) {
      for (var i = 0; i < listings.length; i++) {
        if (listings[i].id === parseInt(listingId)) {
          return listings[i];
        }
      }
      return null;
    }
  };
})

.factory('Account', function(){
  var profile = {
    id: 0,
    firstName: 'First',
    lastName: 'Last',
    username: 'jhadams@iscap.info',
    biography: 'Sample Bio',
    pfp: 'img/profile-icon.png'
  };
  
  return profile;
  /*{
    all: function() {
      return profile;
    },
    get: function(profileId) {
      for (var i = 0; i < profile.length; i++) {
        if (profile[i].id === parseInt(profile)) {
          return profile[i];
        }
      }
      return null;
    }
  };*/
})