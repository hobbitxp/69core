import { useState } from 'react';
import { transfer } from '../api';
import type { TransferRequest } from '../api';

export default function TransferForm() {
  const [form, setForm] = useState<TransferRequest>({
    toaccount: '',
    tobankcode: '',
    amount: 0,
    trade_no: '',
  });
  const [result, setResult] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: name === 'amount' ? Number(value) : value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await transfer(form);
      setResult(res);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError('Transfer failed');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-2">
      <div>
        <label className="block">To Account</label>
        <input
          name="toaccount"
          value={form.toaccount}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">To Bank Code</label>
        <input
          name="tobankcode"
          value={form.tobankcode}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Amount</label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block">Trade No (optional)</label>
        <input
          name="trade_no"
          value={form.trade_no}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Transfer
      </button>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {result && (
        <pre className="bg-gray-100 p-2 mt-2 overflow-x-auto text-sm">
          {JSON.stringify(result, null, 2)}
        </pre>
      )}
    </form>
  );
}
