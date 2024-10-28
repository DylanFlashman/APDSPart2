import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function VerifyTransaction() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const { data } = await axios.get(`/api/payments/transactions/${id}`);
        setTransaction(data);
      } catch (error) {
        console.error('Error fetching transaction', error);
      }
    };

    fetchTransaction();
  }, [id]);

  const verifyTransaction = async () => {
    try {
      await axios.post('/api/payments/verify',{ paymentId: id });
      toast.success('Transaction verified and submitted to SWIFT');
      navigate('/transactions');
    } catch (error) {
      toast.error('Error verifying transaction');
    }
  };

  if (!transaction) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.container}>
      <Link to="/transactions" style={styles.backLink}>
        &lt; Back to Transaction List
      </Link>
      <h1 style={styles.heading}>Verify Transaction</h1>
      <div style={styles.transactionDetails}>
        <p><strong>Amount:</strong> {transaction.amount}</p>
        <p><strong>Currency:</strong> {transaction.currency}</p>
        <p><strong>Account Number:</strong> {transaction.accountNumber}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
        <button style={styles.button} onClick={verifyTransaction}>Submit to SWIFT</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '20px',
    backgroundColor: '#e0f7fa', // Light teal container background
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2rem',
    marginBottom: '20px',
    color: '#00796b', // Dark teal heading color
  },
  transactionDetails: {
    backgroundColor: '#ffffff', // Pure white background for transaction details
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '20px',
    textAlign: 'left',
    color: '#004d40', // Darker teal text color
  },
  button: {
    backgroundColor: '#00796b', // Dark teal button color
    color: '#ffffff', // White text on the button
    padding: '10px 20px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '20px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#004d40', // Darker teal on hover
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.5rem',
    paddingTop: '50px',
    backgroundColor: '#ffeb3b', // Yellow background for visibility during loading
    color: '#333', // Dark text for loading state
  },
};
