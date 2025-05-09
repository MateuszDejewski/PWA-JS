window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator && 'PushManager' in window) {
    navigator.serviceWorker.register('./sw.js')
      .then(reg => {
        console.log('SW zarejestrowany:', reg);

        document.getElementById('subscribe').addEventListener('click', async () => {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const subscription = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(process.env.VAPID_PUBLIC_KEY)
            });

            // Tu wysyłamy subskrypcję na backend
            console.log('Subskrypcja:', JSON.stringify(subscription));
            alert('Subskrybowano pomyślnie!');
          } else {
            alert('Nie udzielono zgody na powiadomienia.');
          }
        });
      })
      .catch(error => console.error('SW nie działa:', error));
  }
};

// Narzędzie pomocnicze do dekodowania klucza VAPID
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
}

fetch('/api/subscribe', {
  method: 'POST',
  body: JSON.stringify(subscription),
  headers: {
    'Content-Type': 'application/json'
  }
});