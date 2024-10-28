import { useState } from "react";
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './RegisterPage.css';

export default function RegisterEmployee() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    username: '',
    email: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });

  const registerEmployee = async (e) => {
    e.preventDefault();
    const { name, username, email, idNumber, accountNumber, password } = data;
    try {
      const { data } = await axios.post('/employees/create', {
        name, username, email, idNumber, accountNumber, password
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } // Include token if necessary
      });

      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success('Employee registration successful!');
        navigate('/employee-dashboard'); // Navigate to employee dashboard or desired page
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during registration.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="register-container">
      <form onSubmit={registerEmployee} className="register-form">
        <h1 className="form-title">Register Employee</h1>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter full name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter username..."
            value={data.username}
            onChange={(e) => setData({ ...data, username: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            placeholder="Enter email..."
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">ID Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter ID number..."
            value={data.idNumber}
            onChange={(e) => setData({ ...data, idNumber: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Account Number</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter account number..."
            value={data.accountNumber}
            onChange={(e) => setData({ ...data, accountNumber: e.target.value })}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            placeholder="Enter password..."
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className="submit-btn">Register Employee</button>

        <button type="button" className="back-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </form>
    </div>
  );
}
