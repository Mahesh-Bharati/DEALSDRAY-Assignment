import React from 'react'
import Logout from './Logout'
import { Link } from 'react-router-dom'
import EmployeeTable from './EmployeeTable'
import SearchEmployee from './SearchEmployee'


function EmployeeList() {
    const user = localStorage.getItem('username')
    
  return (
    <div>
        <div>
        <h1>Logo</h1>
        <div>
            <div className='dashboard-container'>
                <div className='left-menu'>
                    <div className='user-info'>
                <Link to='/dashboard' className='user-info'>Home</Link>
                <Link to='/employee-list' className='user-info'>Employee list</Link>
                </div>
                </div>
                <div className='right-menu'>
                    <div className='user-info'>
                        <p className='user-info'>{user}</p>
                        <Logout className='user-info'></Logout>
                        </div>    
                </div>
            </div>
        </div>
    </div>
        <div className='yellow-strip'>
        <Link to="/create-employee">Create Employee</Link>
        </div>
        <SearchEmployee></SearchEmployee>
        <EmployeeTable></EmployeeTable>
        
        
    </div>
  )
}

export default EmployeeList