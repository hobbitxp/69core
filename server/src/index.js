import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const app = express();
app.use(express.json());

const CORE_KEY = process.env.CORE_KEY || '';
const CORE_SECRET = process.env.CORE_SECRET || '';
const CORE_ACCOUNT = process.env.CORE_ACCOUNT || '';
const API_BASE = 'https://api.69core.com/v1';

function coreSign(data) {
  const key = CORE_KEY + CORE_SECRET;
  return crypto.createHmac('sha256', key).update(data).digest('hex');
}

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Core-Key': CORE_KEY,
    'Core-Secret': CORE_SECRET,
    'Core-Account': CORE_ACCOUNT,
  },
});

app.post('/api/balance', async (_req, res) => {
  try {
    const sign = coreSign(CORE_ACCOUNT);
    const response = await client.post('/balance', { accountNumber: CORE_ACCOUNT }, {
      headers: { 'Core-Sign': sign },
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Balance error' });
  }
});

app.post('/api/statement', async (_req, res) => {
  try {
    const sign = coreSign(CORE_ACCOUNT);
    const response = await client.post('/statement', { accountNumber: CORE_ACCOUNT }, {
      headers: { 'Core-Sign': sign },
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Statement error' });
  }
});

app.post('/api/transfer', async (req, res) => {
  try {
    const body = req.body;
    const sign = coreSign(CORE_ACCOUNT + JSON.stringify(body));
    const response = await client.post('/transfer', body, {
      headers: { 'Core-Sign': sign },
    });
    res.json(response.data);
  } catch {
    res.status(500).json({ error: 'Transfer error' });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Proxy listening on :${port}`);
});
