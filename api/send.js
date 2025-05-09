import webpush from 'web-push';

const publicVapidKey = process.env.VAPID_PUBLIC_KEY;
const privateVapidKey = process.env.VAPID_PRIVATE_KEY;

webpush.setVapidDetails(
  'mailto:admin@example.com',
  publicVapidKey,
  privateVapidKey
);

let subscriptions = []; // ✳️ In production – trzymać to w bazie

export default async function handler(req, res) {
  const payload = JSON.stringify({
    title: 'Nowa wiadomość!',
    body: 'Sprawdź nowe informacje.'
  });

  for (const sub of subscriptions) {
    try {
      await webpush.sendNotification(sub, payload);
    } catch (err) {
      console.error('Błąd powiadomienia:', err);
    }
  }

  res.status(200).json({ message: 'Powiadomienia wysłane' });
}
