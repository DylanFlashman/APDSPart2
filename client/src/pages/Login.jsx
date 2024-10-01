import {useContext, useState} from 'react'
import axios from 'axios'
import {toast} from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie';
import { UserContext } from '../../context/userContext';

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
        navigate('/');
      }
    } catch (error) {
      
    }
  }

  return (
    <div>
      <form onSubmit={loginUser}>
        <label>Username</label>
        <input type='text' placeholder='enter username...' value={data.username} onChange={(e) => setData({...data,username: e.target.value})}/>
        <label>Account Number</label>
        <input type='text' placeholder='enter account number...' value={data.accountNumber} onChange={(e) => setData({...data,accountNumber: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data,password: e.target.value})}/>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
