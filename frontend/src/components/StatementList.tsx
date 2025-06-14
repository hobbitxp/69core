import { useEffect, useState } from 'react';
import { getStatement } from '../api';

interface StatementItem {
  amount: number;
  fromaccount?: string;
  toaccount?: string;
  isTransferIn?: boolean;
}

export default function StatementList() {
  const [items, setItems] = useState<StatementItem[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getStatement()
      .then((res) => {
        const list = Array.isArray(res) ? res : res?.items || [];
        setItems(list.filter((it: StatementItem) => it.isTransferIn));
      })
      .catch((e) => setError(e.message));
  }, []);

  if (error) return <div className="text-red-500">{error}</div>;
  if (!items.length) return <div>No transactions</div>;

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold mb-2">Incoming Transactions</h2>
      <ul className="space-y-2">
        {items.map((it, idx) => (
          <li key={idx} className="p-2 border rounded">
            <span className="font-medium">{it.amount}</span> - {it.fromaccount || it.toaccount}
          </li>
        ))}
      </ul>
    </div>
  );
}
