import React, { useState, useEffect } from 'react';
import '../App.css';

function EmployeeTable() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch('http://localhost:3001/getEmployees');
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error('Failed to fetch employees');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleEdit = (id) => {
    // Implement edit functionality
    console.log('Edit employee with ID:', id);
  };

 
    const handleDelete = async (id) => {
        try {
          const response = await fetch(`http://localhost:3001/deleteEmployee/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            // Remove the deleted employee from the state
            setEmployees(employees.filter(employee => employee._id !== id));
            console.log('Employee deleted successfully');
          } else {
            console.error('Failed to delete employee');
          }
        } catch (error) {
          console.error('Error deleting employee:', error);
        }
      };


  return (
    <div className="employee-table-container">
      <h2>Employee List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.f_Id}</td>
              <td>
                {employee.f_Image && <img src={employee.f_Image} alt="Employee" className="employee-image" />}
              </td>
              <td>{employee.f_Name}</td>
              <td>{employee.f_Email}</td>
              <td>{employee.f_Mobile}</td>
              <td>{employee.f_Designation}</td>
              <td>{employee.f_gender}</td>
              <td>{employee.f_Course}</td>
             
              <td>
                <button onClick={() => handleEdit(employee._id)}>Edit</button>
                <button onClick={() => handleDelete(employee._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;