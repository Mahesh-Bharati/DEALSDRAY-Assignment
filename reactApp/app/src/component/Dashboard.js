import React from 'react';
import '../App.css';
import Logout from './Logout';

function Dashboard() {
    const storedUsername = localStorage.getItem('username');
  return (
    <div>
        <h1>Logo</h1>
        <div className="dashboard-container">
      <div className="left-menu">
        <p>Home</p>
        <p>Employee List</p>
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