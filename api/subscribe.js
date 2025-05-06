let subscription = null;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    subscription = req.body;
    return res.status(201).json({ message: 'Subskrypcja zapisana' });
  }

  res.status(405).end();
}

export { subscription };
