const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Wygeneruj raz i zapisz te klucze!
const vapidKeys = webpush.generateVAPIDKeys();

console.log('PUBLIC KEY:', vapidKeys.publicKey);
console.log('PRIVATE KEY:', vapidKeys.privateKey);

webpush.setVapidDetails(
  'mailto:admin@example.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// Tymczasowy magazyn subskrypcji
let savedSubscription = null;

// Zapis subskrypcji z frontendu
app.post('/subscribe', (req, res) => {
  savedSubscription = req.body;
  res.status(201).json({ message: 'Subskrypcja zapisana' });
});

// Ręczne wysłanie powiadomienia
app.post('/send', (req, res) => {
  if (!savedSubscription) {
    return res.status(400).json({ error: 'Brak subskrypcji' });
  }

  const payload = JSON.stringify({
    title: 'Nowe wiadomości!',
    body: 'Sprawdź, co nowego pojawiło się w aplikacji.'
  });

  webpush.sendNotification(savedSubscription, payload)
    .then(() => res.status(200).json({ success: true }))
    .catch(err => {
      console.error('Błąd wysyłania powiadomienia:', err);
      res.sendStatus(500);
    });
});

// Start serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
