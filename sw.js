// const cacheName = 'piac-pwa-v1'; 
// const filesToCache = [ 
// '/', 
// '/index.html', 
// '/style.css', 
// '/js/main.js' 
// ]; 
 
// self.addEventListener('install', (event) => { 
//   event.waitUntil( 
//     caches.open(cacheName).then((cache) => { 
//       return cache.addAll(filesToCache); 
//     }) 
//   ); 
// }); 
 
// self.addEventListener('fetch', (event) => { 
//     event.respondWith( 
//       caches.match(event.request).then((response) => { 
//         return response || fetch(event.request).then((fetchResponse) => { 
//           return caches.open(cacheName).then((cache) => { 
//             cache.put(event.request, fetchResponse.clone()); 
//             return fetchResponse; 
//           }); 
//         }); 
//       }).catch(() => { 
//         if (event.request.mode === 'navigate') { 
//           return caches.match('/index.html'); 
//         } 
//       }) 
//     ); 
//   }); 
 
  

// self.addEventListener('activate', (event) => { 
//   const cacheWhitelist = [cacheName]; 
   
//   event.waitUntil( 
//     caches.keys().then((cacheNames) => { 
//       return Promise.all( 
//         cacheNames.map((cache) => { 
//           if (!cacheWhitelist.includes(cache)) { 
//             return caches.delete(cache); 
//           } 
//         }) 
//       ); 
//     }) 
//   ); 
// }); 

self.addEventListener('push', event => {
  console.log("push handling")
  const data = event.data.json();
  self.registration.showNotification("Powiadomienie", {
    body: "Nowe wiadomości, sprawdź aplikację",
    icon: 'images/favicon-96x96.png',
  });
});