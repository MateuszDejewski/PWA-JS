import webpush from 'web-push';

const subscriptions = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    subscriptions.push(req.body);
    res.status(201).json({});
  } else {
    res.status(405).end();
  }
}
