if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(reg => {
    console.log('Service Worker zarejestrowany:', reg);
  });
}

document.getElementById('subscribe').addEventListener('click', async () => {
  console.log("Sub button clicked")
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return alert('Brak zgody na powiadomienia.');

  const reg = await navigator.serviceWorker.ready;
  const sub = await reg.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array('BHkoz373H0EVMQO9mxRWX6AwOj1x457KeYIHOFtBPAt9ngeB26c4y0wVXFX9-2bXsRDpCBQ3tNFf82rTC2bCVAI')
  });

  // Wyślij subskrypcję na serwer
  await fetch('/subscribe', {
    method: 'POST',
    body: JSON.stringify(sub),
    headers: { 'Content-Type': 'application/json' }
  });

  alert('Subskrybowano!');
});

// Helper
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return new Uint8Array([...rawData].map(c => c.charCodeAt(0)));
}
