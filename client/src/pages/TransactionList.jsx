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
    <div style={styles.container}>
      <h1 style={styles.heading}>Pending Transactions</h1>
      <Link to="/employee-dashboard" style={styles.backLink}>
        &lt; Back to Dashboard
      </Link>
      <ul style={styles.transactionList}>
        {transactions.map((transaction) => (
          <li key={transaction._id} style={styles.transactionItem}>
            <div style={styles.transactionContent}>
              <p><strong>USER ID:</strong> {transaction._id}</p>
              <p><strong>AMOUNT:</strong> {transaction.amount}</p>
              <p><strong>CURRENCY:</strong> {transaction.currency}</p>
              <p><strong>ACCOUNT NUMBER:</strong> {transaction.accountNumber}</p>
              <p><strong>STATUS:</strong> {transaction.status}</p>
              <p><strong>SWIFT CODE:</strong> {transaction.swiftCode}</p>
              <Link to={`/verify/${transaction._id}`} style={styles.verifyLink}>
                Verify
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#333',
  },
  transactionList: {
    listStyleType: 'none',
    padding: 0,
  },
  transactionItem: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  transactionContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    color: '#555',
  },
  verifyLink: {
    display: 'inline-block',
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: '4px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};