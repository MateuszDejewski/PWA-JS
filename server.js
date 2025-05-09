const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/')));

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:admin@example.com',
  publicVapidKey,
  privateVapidKey
);


let subscriptions = [];

app.post('/subscribe', (req, res) => {
  subscriptions.push(req.body);
  res.status(201).json({});
});

app.get('/send', async (req, res) => {
  const payload = JSON.stringify({ title: 'Nowa wiadomość!', body: 'Sprawdź nowe informacje.' });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (e) {
      console.error('Błąd powiadomienia:', e);
    }
  }

  res.send('Powiadomienia wysłane');
});

app.listen(3000, () => console.log('Serwer na porcie 3000'));
