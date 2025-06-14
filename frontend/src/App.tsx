import BalanceView from './components/BalanceView';
import StatementList from './components/StatementList';
import TransferForm from './components/TransferForm';
import './index.css';

export default function App() {
  return (
    <div className="container mx-auto p-4 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">69core Dashboard</h1>
      <BalanceView />
      <StatementList />
      <TransferForm />
    </div>
  );
}
