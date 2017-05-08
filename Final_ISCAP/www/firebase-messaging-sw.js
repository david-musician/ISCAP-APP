importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

  // Initialize Firebase



  // Initialize Firebase
      var config = {
        apiKey: "AIzaSyCfRGNlNEjM-iodzW_FCLryp1UJfAeaz4g",
        authDomain: "iscap-2127e.firebaseapp.com",
        databaseURL: "https://iscap-2127e.firebaseio.com",
        projectId: "iscap-2127e",
        storageBucket: "iscap-2127e.appspot.com",
        messagingSenderId: "802032967576"
      };
      firebase.initializeApp(config);



const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: payload.data.status,
    icon: '/icon-logo.png'
  };

  return self.registration.showNotification(notificationTitle,
      notificationOptions);
});
