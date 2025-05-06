import webpush from 'web-push';
import { subscription } from './subscribe';

webpush.setVapidDetails(
  'mailto:admin@example.com',
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default async function handler(req, res) {
  if (!subscription) {
    return res.status(400).json({ error: 'Brak subskrypcji' });
  }

  const payload = JSON.stringify({
    title: 'Nowe wiadomości!',
    body: 'Zajrzyj do aplikacji – pojawiły się nowe treści.'
  });

  try {
    await webpush.sendNotification(subscription, payload);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Push error:', err);
    return res.status(500).json({ error: 'Push failed' });
  }
}
