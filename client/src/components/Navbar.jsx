import { Link, useNavigate } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../context/userContext";
import Cookies from 'js-cookie';

export default function Navbar() {

  const navigate = useNavigate();
  const { user, resetUser } = useContext(UserContext);
  const isEmployee = user?.role === 'employee';

  const handleLogout = () => {
    localStorage.removeItem('token');
    Cookies.remove('token');
    resetUser(); // Reset user context
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.linkContainer}>
        <Link to='/' style={styles.link}>Home</Link>
        <Link to='/register' style={styles.link}>Register</Link>
        <Link to='/login' style={styles.link}>Login</Link>
        <Link to='/submitPayment' style={styles.link}>Payment</Link>
        {isEmployee && (
          <>
            <Link to='/transactions' style={styles.link}>Transaction List</Link>
            <Link to='/verify' style={styles.link}>Verify</Link>
            <Link to='/register-employee' style={styles.link}>Register Employee</Link>
          </>
        )}
      </div>
      {user && (
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      )}
    </nav>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#343a40',
    color: '#fff',
  },
  linkContainer: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1rem',
    padding: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  logoutButton: {
    padding: '10px 15px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'background-color 0.3s',
  },
};
