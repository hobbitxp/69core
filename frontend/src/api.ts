import axios from 'axios';
import CryptoJS from 'crypto-js';
import { CORE_KEY, CORE_SECRET, CORE_ACCOUNT, API_BASE } from './config';

function generateCoreSign(data: string) {
  const key = CORE_KEY + CORE_SECRET;
  return CryptoJS.HmacSHA256(data, key).toString();
}

const api = axios.create({
  baseURL: `${API_BASE}/v1`,
  headers: {
    'Content-Type': 'application/json',
    'Core-Key': CORE_KEY,
    'Core-Secret': CORE_SECRET,
    'Core-Account': CORE_ACCOUNT,
  },
});

export async function getBalance() {
  const sign = generateCoreSign(CORE_ACCOUNT);
  const res = await api.post('/balance', { accountNumber: CORE_ACCOUNT }, {
    headers: { 'Core-Sign': sign },
  });
  return res.data;
}

export async function getStatement() {
  const sign = generateCoreSign(CORE_ACCOUNT);
  const res = await api.post('/statement', { accountNumber: CORE_ACCOUNT }, {
    headers: { 'Core-Sign': sign },
  });
  return res.data;
}

export interface TransferRequest {
  toaccount: string;
  tobankcode: string;
  amount: number;
  trade_no?: string;
}

export async function transfer(body: TransferRequest) {
  const sign = generateCoreSign(CORE_ACCOUNT + JSON.stringify(body));
  const res = await api.post('/transfer', body, {
    headers: { 'Core-Sign': sign },
  });
  return res.data;
}
