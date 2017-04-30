importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

  // Initialize Firebase


  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBz0bUMoSwej2ovpBqONVQNut7YYoxgCyU",
    authDomain: "iscap1-f6eae.firebaseapp.com",
    databaseURL: "https://iscap1-f6eae.firebaseio.com",
    projectId: "iscap1-f6eae",
    storageBucket: "iscap1-f6eae.appspot.com",
    messagingSenderId: "542283887421"
  };
  firebase.initializeApp(config);


const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.data.status,
    icon: '/firebase-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});