import {useContext, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { UserContext } from '../../context/userContext';
import './LoginPage.css';

export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext);
  const [data,setData] = useState({
    username: '',
    accountNumber: '',
    password: '',
  })

  const loginUser = async (e) =>{
    e.preventDefault()
    const {username,accountNumber, password} = data
    try {
      const {data} = await axios.post('/login', {
        username,
        accountNumber,
        password
      });
      if(data.error){
        toast.error(data.error)
      }else{

        //localStorage.setItem('userId', data.data.id );
        //localStorage.setItem('token', data.data.token);
        Cookies.set('token', data.token);
        setUser({ id: data.id, name: data.name, email: data.email });
        setData({});
        navigate('/SubmitPayment');
      }
    } catch (error) {
      
    }
  }

  const handleBackToHome = () => {
    navigate('/'); 
  };

  return (
    <div className="login-container">
      <form onSubmit={loginUser} className="login-form">
        <h1 className="form-title">Login</h1>

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

        <button type="submit" className="submit-btn">Login</button>

        <button type="button" className="back-btn" onClick={handleBackToHome}>
          Back to Home
        </button>
      </form>
    </div>
  )
}
