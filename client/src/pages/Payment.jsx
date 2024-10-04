import { useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import './PaymentPage.css';

export default function Payment() {
    const navigate = useNavigate()
    const { user } = useContext(UserContext);

  const [data, setData] = useState({
    //customerId: '',
    amount: '',
    currency: '',
    provider: 'SWIFT', // Default to SWIFT
    accountNumber: '',
    swiftCode: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {amount,currency,provider,accountNumber,swiftCode} = data
    //const response = await axios.post('/api/payments/payment', data);
    //const userId = localStorage.getItem('userId');
    if (!user) {
      toast.error('User is not logged in');
      return;
    }

    try {
        const {data} = await axios.post('/api/payments/payment',{
            
            amount,
            currency,
            provider,
            accountNumber,
            swiftCode,
            customerId: user.id
        });
        console.log(data.data);
        if(data.error){
            toast.error(data.error)
        }
        else{
            setData({});
            navigate('/')
        }

      //toast.success('Payment submitted successfully');
      //setData({
       // amount: '',
       // currency: '',
       // provider: 'SWIFT',
       // accountNumber: '',
       // swiftCode: '',
      //});
    } catch (error) {
      toast.error('Error submitting payment' + error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Submit Payment</h1>
      <form onSubmit={handleSubmit} className="payment-form">
        <div className="form-group">
          <label className="form-label">Amount</label>
          <input
            type="number"
            value={data.amount}
            onChange={(e) => setData({ ...data, amount: e.target.value })}
            className="form-input"
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Currency</label>
          <select
            value={data.currency}
            onChange={(e) => setData({ ...data, currency: e.target.value })}
            className="form-select"
          >
            <option value="USD">USD</option>
            <option value="ZAR">ZAR</option>
            <option value="EUR">EUR</option>
            {/* Add other currencies as needed */}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            value={data.accountNumber}
            onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
            className="form-input"
            placeholder="Enter account number"
          />
        </div>

        <div className="form-group">
          <label className="form-label">SWIFT Code</label>
          <input
            type="text"
            value={data.swiftCode}
            onChange={(e) => setData({ ...data, swiftCode: e.target.value })}
            className="form-input"
            placeholder="Enter SWIFT code"
          />
        </div>

        <button type="submit" className="submit-btn">Pay Now</button>
      </form>
    </div>
  );
}
