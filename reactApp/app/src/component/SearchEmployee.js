import React, { useState } from 'react';

const SearchEmployee = () => {
  const [searchId, setSearchId] = useState('');
  const [employeeData, setEmployeeData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:3001/searchEmployee/${searchId}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeData(data);
      } else {
        console.error('Failed to fetch employee data');
      }
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };

  return (
    <div>
      <input 
        type="text"
        placeholder="Search Employee by ID"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      {employeeData && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Designation</th>
              <th>Gender</th>
              <th>Courses</th>
              {/* Add more table headers for other employee fields */}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{employeeData.f_Id}</td>
              <td>{employeeData.f_Name}</td>
              <td>{employeeData.f_Email}</td>
              <td>{employeeData.f_Mobile}</td>
              <td>{employeeData.f_Designation}</td>
              <td>{employeeData.f_gender}</td>
              <td>{employeeData.f_Course}</td>
              {/* Add more table cells for other employee fields */}
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SearchEmployee;
