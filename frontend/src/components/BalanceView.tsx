import { useEffect, useState } from 'react';
import { getBalance } from '../api';

type Balance = {
  balance: number;
  fullname?: string;
  bankName?: string;
  accountNumber?: string;
};

export default function BalanceView() {
  const [data, setData] = useState<Balance | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    getBalance()
      .then(setData)
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-2">Balance</h2>
      <p className="text-2xl">{data.balance}</p>
      {data.fullname && <p className="mt-2">{data.fullname}</p>}
      {data.bankName && <p>{data.bankName}</p>}
      {data.accountNumber && <p>{data.accountNumber}</p>}
    </div>
  );
}
