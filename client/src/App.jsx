import './App.css'
import {Routes, Route, Navigate } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home'
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import SubmitPayment from '../src/pages/Payment'; 
import TransactionList from '../src/pages/TransactionList'; 
import VerifyTransaction from '../src/pages/VerifyTransaction'; 
import RegisterEmployee from '../src/pages/RegisterEmployee';
import EmployeeDashboard from './pages/EmployeeDashboard';
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContext, UserContextProvider } from '../context/userContext';
import ProtectedRoute from '../context/ProtectedRoutes';

axios.defaults.baseURL = 'https://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      { <Navbar /> }
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
          {/* <Route exact path="/">
            <Navigate to="/login" />
          </Route> */}
          <Route path='/' element={<Home/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/submitPayment' element={<ProtectedRoute><SubmitPayment/></ProtectedRoute>} /> 
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path='/transactions' element={<TransactionList />} /> 
          <Route path='/verify/:id' element={<VerifyTransaction />} />
          <Route path="/register-employee" element={<RegisterEmployee/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App
