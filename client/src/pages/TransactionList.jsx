import { useEffect, useState } from 'react';
import axios from 'axios';

export default function TransactionList() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await axios.get('/api/payments/transactions');
        setTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions', error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Pending Transactions</h1>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction._id}>
            <p>Amount: {transaction.amount}</p>
            <p>Currency: {transaction.currency}</p>
            <p>Account Number: {transaction.accountNumber}</p>
            <p>Status: {transaction.status}</p>
            <a href={`/verify-transaction/${transaction._id}`}>Verify</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
