import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
            <p>User ID: {transaction._id}</p>
            <p>Amount: {transaction.amount}</p>
            <p>Currency: {transaction.currency}</p>
            <p>Account Number: {transaction.accountNumber}</p>
            <p>Status: {transaction.status}</p>
            <Link to={`/verify/${transaction._id}`}>Verify</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
