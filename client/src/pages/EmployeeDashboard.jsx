import React from 'react';
import { Link } from 'react-router-dom';
import './EmployeeDashboard.css'; // Import the CSS file for styling

const EmployeeDashboard = () => {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Employee Dashboard</h1>
      <div className="dashboard-links">
        <Link to="/transactions" className="dashboard-link">Transaction List</Link>
        <Link to="/verify" className="dashboard-link">Verify</Link>
        <Link to="/register-employee" className="dashboard-link">Register Employee</Link>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
