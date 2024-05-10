import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Heading from './Heading';

const EditEmployee = () => {
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getEmployee/${id}`);
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

    fetchEmployeeData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/updateEmployee/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(employeeData)
      });
      if (response.ok) {
        alert('Employee data updated successfully');
        // Redirect to employee list or show success message
      } else {
        alert('Failed to update employee data');
      }
    } catch (error) {
      alert('Error updating employee data:', error);
    }
  };
  
  return (
    <>
    <div>
         <Heading></Heading>
    </div>
    <div className='yellow-strip'>
            <p>Edit Employee Details</p>
    </div>
    <div className='edit-employee-container'>
      {employeeData && (
        <form onSubmit={handleSubmit}>
          <label>ID:</label>
          <input type="text" value={employeeData.f_Id} disabled />
          <div className="form-group">
            <label>Name:</label>
            <input type="text" name="f_Name" value={employeeData.f_Name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input type="email" name="f_Email" value={employeeData.f_Email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input type="text" name="f_Mobile" value={employeeData.f_Mobile} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Designation:</label>
            <input type="text" name="f_Designation" value={employeeData.f_Designation} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gender:</label>
            <select name="f_gender" value={employeeData.f_gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Courses:</label>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="MCA" onChange={handleChange} checked={employeeData.f_Course.includes('MCA')} />
                MCA
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="BCA" onChange={handleChange} checked={employeeData.f_Course.includes('BCA')} />
                BCA
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox" name="f_Course" value="BSC" onChange={handleChange} checked={employeeData.f_Course.includes('BSC')} />
                BSC
              </label>
            </div>
            
          </div>
          <div className="form-group">
            <label>Image:</label>
            <input type="file" name="f_Image" onChange={handleChange} />
          </div>
          <button type="submit">Update</button>
        </form>
      )}
    </div>
    </>
  );
};

export default EditEmployee;
