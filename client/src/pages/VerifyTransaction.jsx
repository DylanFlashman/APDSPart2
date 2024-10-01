import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

export default function VerifyTransaction() {
  const { id } = useParams();
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
      await axios.post('/api/payments/verify', { paymentId: id });
      toast.success('Transaction verified and submitted to SWIFT');
    } catch (error) {
      toast.error('Error verifying transaction');
    }
  };

  if (!transaction) return <div>Loading...</div>;

  return (
    <div>
      <h1>Verify Transaction</h1>
      <p>Amount: {transaction.amount}</p>
      <p>Currency: {transaction.currency}</p>
      <p>Account Number: {transaction.accountNumber}</p>
      <p>Status: {transaction.status}</p>
      <button onClick={verifyTransaction}>Submit to SWIFT</button>
    </div>
  );
}
