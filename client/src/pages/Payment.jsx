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
    provider: 'SWIFT', 
    accountNumber: '',
    swiftCode: '',
    reference:''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {amount,currency,provider,accountNumber,swiftCode,reference} = data
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
            reference,
            customerId: user.id
        });
        console.log(data.data);
        if(data.error){
            toast.error(data.error)
        }
        else{
            toast.success('Payment Submitted Successfully');
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

  const handleBackToHome = () => {
    navigate('/'); 
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
            <option value="">Currency</option>
            <option value="USD">USD</option>
            <option value="ZAR">ZAR</option>
            <option value="EUR">EUR</option>
            <option value="YEN">YEN</option>
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
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

        <div className="form-group">
          <label className="form-label">Payement Reference</label>
          <input
            type="text"
            value={data.reference}
            onChange={(e) => setData({...data, reference: e.target.value})}
            className="form-input"
            placeholder='Enter payment reference'
          />
        </div>
        <button type="submit" className="submit-btn">Pay Now</button>

        <button type="button" className="back-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </form>
    </div>
  );
}
