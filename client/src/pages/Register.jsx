import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import './RegisterPage.css';

export default function Register() {
  const navigate = useNavigate()
  const [data,setData] = useState({
    name: '',
    username: '',
    email: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  })

  const registerUser = async (e) =>{
    e.preventDefault();
    const {name, username, email, idNumber, accountNumber, password} = data
    try {
      const {data} = await axios.post('/register',{
        name,username,email,idNumber,accountNumber,password
      })
      if(data.error){
        toast.error(data.error)
      }else{
        setData({})
        toast.success('Registration successful!')
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={registerUser} className="register-form">
        <h1 className="form-title">Register</h1>

        <div className="form-group">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-input"
            placeholder="Enter full name..."
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
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
          />
        </div>

        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
  )
}
