import './App.css'
import {Routes, Route} from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home'
import Register from '../src/pages/Register';
import Login from '../src/pages/Login';
import SubmitPayment from '../src/pages/Payment'; // Add this
import TransactionList from '../src/pages/TransactionList'; // Add this
import VerifyTransaction from '../src/pages/VerifyTransaction'; // Add this
import axios from 'axios';
import {Toaster} from 'react-hot-toast'
import { UserContext, UserContextProvider } from '../context/userContext';

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

function App() {
  return (
    <UserContextProvider>
      <Navbar />
      <Toaster position='bottom-right' toastOptions={{duration: 2000}}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/submitPayment' element={<SubmitPayment />} /> {/* Add this */}
        <Route path='/transactions' element={<TransactionList />} /> {/* Add this */}
        <Route path='/verify/:id' element={<VerifyTransaction />} />
        
      </Routes>
    </UserContextProvider>
  )
}

export default App
