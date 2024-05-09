import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import Logout from './Logout';

function Dashboard() {
    const storedUsername = localStorage.getItem('username');
  return (
    <div>
        <h1>Logo</h1>
        <div className="dashboard-container">
      <div className="left-menu">
        <div className='user-info'>
        <p className='user-info'>Home</p>
        {/* <Link to='/Employeelist'>EmployeeList</Link> */}
        <Link to="/employee-list" className='user-info'>Employee List</Link>
        </div>
      </div>
      <div className="right-menu">
  <div className="user-info">
    <p>{storedUsername}</p>
    <Logout />
  </div>
</div>

    </div>
      <p className='yellow-strip'>Welcome to the Dashboard!</p>
      <p className='container'>Welcome to addmin panel</p>
      
    </div>
    
  );
}

export default Dashboard;