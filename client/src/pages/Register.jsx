import { useState } from "react";
import axios from 'axios';
import {toast} from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

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
    <div>
      <form onSubmit={registerUser}>
        <label>Full Name</label>
        <input type='text' placeholder='enter full name...' value={data.name} onChange={(e) => setData({...data,name: e.target.value})}/>
        <label>Username</label>
        <input type='text' placeholder='enter username...' value={data.username} onChange={(e) => setData({...data,username: e.target.value})}/>
        <label>Email</label>
        <input type='email' placeholder='enter email...' value={data.email} onChange={(e) => setData({...data,email: e.target.value})}/>
        <label>ID Number</label>
        <input type='text' placeholder='enter id number...' value={data.idNumber} onChange={(e) => setData({...data,idNumber: e.target.value})}/>
        <label>Account Number</label>
        <input type='text' placeholder='enter account number...' value={data.accountNumber} onChange={(e) => setData({...data,accountNumber: e.target.value})}/>
        <label>Password</label>
        <input type='password' placeholder='enter password...' value={data.password} onChange={(e) => setData({...data,password: e.target.value})}/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
