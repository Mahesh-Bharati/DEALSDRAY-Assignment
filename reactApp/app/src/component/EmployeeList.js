import React from 'react'
import Logout from './Logout'
import { Link } from 'react-router-dom'
function EmployeeList() {
  return (
    <div>
        <h1>Logo</h1>
        <div className='dashboard-container'>
            <div className='left-menu'>
                <div className='user-info'>
                <Link to="/dashboard">Home</Link>
                    <p>Employee List</p>
                </div>
            </div>
            <div className='right-menu'>
                <div className='user-info'>
                
                    <Logout></Logout>
                </div>
            </div>
        </div>
        <div className='yellow-strip'>
        <Link to="/create-employee">Create Employee</Link>
        </div>
    </div>
  )
}

export default EmployeeList