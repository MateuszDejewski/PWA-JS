importScripts('https://www.gstatic.com/firebasejs/11.7.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/11.7.1/firebase-messaging.js');

// Inicjalizacja Firebase w Service Workerze
const firebaseConfig = {
  apiKey: "AIzaSyAWTYZnfoPq2eImwcDmSoqq7izFN6e50ps",
  authDomain: "pwajs-91d0f.firebaseapp.com",
  projectId: "pwajs-91d0f",
  storageBucket: "pwajs-91d0f.firebasestorage.app",
  messagingSenderId: "641751115148",
  appId: "1:641751115148:web:25f5424fe180565b11e2a9",
  measurementId: "G-N4Y02JV9QB"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

// Obsługuje powiadomienia w tle
messaging.onBackgroundMessage((payload) => {
  console.log('Otrzymano powiadomienie w tle:', payload);
  const { title, body } = payload.notification;

  // Pokazuje powiadomienie
  self.registration.showNotification(title, {
    body: body,
    icon: '/images/favicon.ico',
  });
});
