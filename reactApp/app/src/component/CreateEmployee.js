import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import Logout from './Logout';

function CreateEmployee() {
  const [formData, setFormData] = useState({
    f_Id: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
    f_Image: null // For storing the selected file
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    // If checkbox is checked, add course to the array, otherwise remove it
    setFormData((prevFormData) => {
      if (checked) {
        return { ...prevFormData, [name]: [...prevFormData[name], e.target.value] };
      } else {
        return { ...prevFormData, [name]: prevFormData[name].filter((course) => course !== e.target.value) };
      }
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, f_Image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (let key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://localhost:3001/addEmployee', {
        method: 'POST',
        body: formDataToSend
      });
      if (response.ok) {
        alert('Employee added successfully!');
      } else {
        alert('Failed to add employee');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Error adding employee');
    }
  };
            const user = localStorage.getItem('username')
  return (
    <>
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
            <p>Create New Employee</p>
    </div>
    <div className="employee-form-container">
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>ID:</label>
          <input type="text" name="f_Id" value={formData.f_Id} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="f_Name" value={formData.f_Name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="f_Email" value={formData.f_Email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Mobile:</label>
          <input type="text" name="f_Mobile" value={formData.f_Mobile} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Designation:</label>
          <input type="text" name="f_Designation" value={formData.f_Designation} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="f_gender" value={formData.f_gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Courses:</label>
          <div>
            <label>
              <input type="checkbox" name="f_Course" value="Math" onChange={handleCheckboxChange} checked={formData.f_Course.includes('Math')} />
              MCA
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="f_Course" value="Science" onChange={handleCheckboxChange} checked={formData.f_Course.includes('Science')} />
              BCA
            </label>
          </div>
          <div>
            <label>
              <input type="checkbox" name="f_Course" value="History" onChange={handleCheckboxChange} checked={formData.f_Course.includes('History')} />
              BSC
            </label>
          </div>
          {/* Add more checkboxes for other courses as needed */}
        </div>
        <div className="form-group">
          <label>Image:</label>
          <input type="file" name="f_Image" onChange={handleFileChange} />
        </div>
        <button type="submit">Add Employee</button>
      </form>
    </div>
    </>
  );
}

export default CreateEmployee;
