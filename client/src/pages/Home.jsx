import React from 'react'
import './HomePage.css';
import { Link } from 'react-router-dom';

export default function Home() {
  return (

    <div className="homepage-container">

      <header className="navbar">
        <div className="logo">
          <h1>International Banking Portal App</h1> 
        </div>
        {/* <nav className="nav-links">
          <Link to="/Register" className="nav-link">Register</Link>
          <Link to="/Login" className="nav-link">Login</Link>
          <Link to="/SubmitPayment" className="nav-link">Payments</Link>
          
        </nav> */}
      </header>

      <div className="main-content">
        <section className="intro-section">
          <h2>Welcome to Your Banking Dashboard</h2>
          <p>
            Manage your payments, check transactions, and review your account status. 
            Use the navigation above to access your profile, settings, and more.
          </p>

          <div className="cta-buttons">
            <Link to="/SubmitPayment">
              <button className="cta-btn">Go to Payments</button>
            </Link>
          </div>
        </section>

        <section className="feature-section">
          <div className="feature">
            <h3>Track Transactions</h3>
            <p>View pending and completed transactions with detailed information.</p>
          </div>

          <div className="feature">
            <h3>Secure Payments</h3>
            <p>Make payments securely using industry-standard encryption and SWIFT integration.</p>
          </div>

          <div className="feature">
            <h3>Account Management</h3>
            <p>Manage your profile, account settings, and personal details with ease.</p>
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>&copy; 2024 Banking App. All rights reserved.</p>
      </footer>
    </div>
  )
}
