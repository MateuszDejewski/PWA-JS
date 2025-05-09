import { getNotificationToken, handleForegroundMessages } from './firebase.js';

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js') // Rejestracja Service Workera
      .then(reg => {
        console.log('Service Worker zarejestrowany:', reg);

        document.getElementById('subscribe').addEventListener('click', async () => {
          const token = await getNotificationToken();

          if (token) {
            alert("Subskrybowano pomyślnie!");
            // Wyślij token na backend
            fetch('/api/subscribe', {
              method: 'POST',
              body: JSON.stringify({ token }),
              headers: {
                'Content-Type': 'application/json'
              }
            });
          }
        });
      })
      .catch(error => console.error('Błąd podczas rejestracji Service Workera:', error));
  }

  // Obsługuje przychodzące powiadomienia w tle
  handleForegroundMessages();
};
