# ISCAP Mobile Application
**Project created on:** 4/15/2017

**Github Repo:** https://github.com/david-musician/ISCAP-APP

## Description
This mobile application will allow a user to log in and interact with the app
based on their role and authentication status. A user will be able to receive
push notifications, and select roles will be able to create announcements that
will turn into push notifications.
The rest of the features of the ISCAP app have been broken down according to
their corresponding menu links.

### Features

#### Menu:
* **Events:** Schedule/Calendar ([View this site for reference](http://breimer.sienacs.com/#schedule))
    All users should be able to search the events and sort and filter by any
    entity's properties
* **Announcements** - AKA MessageBoard. The ChairPerson is able to log into the 
    app and create announcements. Users will then receive a push notification 
    and be able to comment on the announcement.
* **Directory** - List of authors, board members, the CEO, and 
    other individuals (perhaps even fellow members). Categorize into groups, add
    search and sort functions. Viewable information includes a picture, name,
    bio, and events they're speaking at.
* **Maps**
  * **Weather** - A brief overview of the weather, to help the user decide if
        they want to do any sightseeing, eat at an off-location restaurant, or
        how the weather will be in general
  * **Conference location and directions** - Interactive map with directions 
        guiding the user to the conference location
  * **Nearby Attractions/Restaurants** - Dynamic infinite scroll view that shows
        nearby restaurants and attractions that a user may wish to visit. The 
        user will be able to filter locations based on certain criteria, and 
        once they click on a location they will be presented with more 
        information and directions.
* **Lost and Found** - Users can report if they have lost any items recently.
* **FAQ** - A list of frequently asked questions, and contact information.
* **Social media buttons** - buttons to help users locate ISCAP events on social
    media. [Linkedin](https://www.linkedin.com/company/information-systems-and-computing-academic-professionals-inc)

#### Settings:
* **Profile:** - The user's profile page, where they can view and edit their
    information or delete their account. The information here includes username,
    profile picture, nickname, bio, and scheduled events (Attending).
* **Logout:** - Logs the user out of the app.

Mockups: 
[Mockups]: ./misc/simple_mockups.png "Mockups image"

### To start the server:
1. In one terminal, at the root, execute ```./mongod```
2. In another terminal, execute ```cd iscap_server && node server.js```

### To start the mobile app:
3. In a new terminal, execute:
```cd Final_ISCAP && ionic serve -p $PORT --nolivereload```

### Code notes

#### Schema

```json
{
    "Schedule": [{
        "eventId": "",
        "eventType": "",
        "mealType": "Breakfast",
        "startTime": "00:00:00",
        "endTime": "00:00:00",
        "room": "CC205",
        "chair": "Mickey Mouse",
        "subjectArea": "",
        "eventTitle": "The Land Before Twitter",
        "date": "",
        "Presenter": [{
            "firstName": "",
            "lastName": "",
            "affiliation": ""
        }, {
            "firstName": "",
            "lastName": "",
            "affiliation": ""
        }],
        "customLabel": "Board Meeting",
        "note": ""
    }],

    "Save": [{
        "eventId": "",
        "eventType": "",
        "mealType": "Breakfast",
        "startTime": "00:00:00",
        "endTime": "00:00:00",
        "room": "CC205",
        "chair": "Mickey Mouse",
        "subjectArea": "",
        "eventTitle": "The Land Before Twitter",
        " date": "",
        "Presenter": [{
            "firstName": "",
            "lastName": "",
            "affiliation": ""
        }, {
            "firstName ": "",
            "lastName": "",
            "affiliation": ""
        }],
        "customLabel": "Board Meeting",
        "note": ""
    }],

    "message": [{
        "messageId": "",
        "title": "",
        "messageText": "",
        "dateTime": "",
        "category": "",
        "photo": "",
        "link": ""
    }],

    "Other": {
        "announcement": [{
            "messageId": [{
                "messageId": ""
            }, {
                "messageId": ""
            }, {
                "messageId": ""
            }],
            "title": "",
            "messageText": "",
            "dateTime": "",
            "category": "",
            "photo": "",
            "link": ""
        }]
    }
}

```

We will be using the following code for .run instead of the current version once
user authorization and roles are confirmed working.
```javascript
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
```

### Helpful links
* [Ionic](https://ionicframework.com/)
* [Markdown cheat sheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
* [Linux cheat sheet](https://files.fosswire.com/2007/08/fwunixref.pdf)
* [Github cheat sheet](https://www.git-tower.com/blog/git-cheat-sheet/)
* [How to push an existing Cloud9 project to GitHub](http://lepidllama.net/blog/how-to-push-an-existing-cloud9-project-to-github/)
* [How to start an Ionic project in c9](https://github.com/ahuimanu/cidm4385-2016sp-ionic-basics)
* [Setting up MongoDB for Cloud9](https://community.c9.io/t/setting-up-mongodb/1717)
* [Express routing](https://expressjs.com/en/guide/routing.html)
* [To change MongoDB's default port of 27017](http://ourownjava.com/mongodb/how-to-change-default-por/)
* [How to redirect user after login](https://forum.ionicframework.com/t/after-login-is-successful-how-to-redirect-to-home-page/11208)
* [How to log in users in Ionic 1](https://devdactic.com/user-auth-angularjs-ionic/)
* [How to create and push to a Github branch:](http://stackoverflow.com/questions/1519006/how-do-you-create-a-remote-git-branch)

### Known issues
1. User authentication does not quite work. Need to debug
2. User roles need to be implemented


### TODO:
1. Implement calendar and formatting for Events
2. Implement maps, searching, and directions. Google Maps API, and ionic cards
3. Implement search and sort on appropriate views
4. Implement list for directory (ng-repeat)
5. Implement role-based announcements/comments (ng-repeat, CRUD operations)
6. Implement contact form for Lost and Found (contact form)
7. Implement list for FAQ (ng-repeat)
8. Implement social media links (simple images and hyperlinks)
9. Fix user login (need to debug server)
10. Implement user roles (view tutorials)
11. Implement profile page, including setting picture
12. Connect to Firebase