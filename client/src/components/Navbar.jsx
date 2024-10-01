import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <Link to='/Login'>Login</Link>
      <Link to='/SubmitPayment'>Payment</Link>
      <Link to='/transactions'>TransactionList</Link>
      <Link to='/verify'>Verify</Link>
    </nav>
  )
}
