import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const UpdateUser = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on component mount
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${id}`);
        const userData = response.data;
        setName(userData.name || '');
        setEmail(userData.email || '');
        setAge(userData.age || '');
        setRole(userData.role || '');
        setGender(userData.gender || ''); // Assuming gender is retrieved from backend
      } catch (error) {
        console.error('Error fetching user:', error);
        // Handle error fetching user data
      }
    };

    fetchUserData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age, role, gender };

    try {
      // Update user data
      const response = await axios.put(`http://localhost:3000/users/${id}`, updatedUser);
      console.log('User updated successfully:', response.data);
      navigate('/');
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error updating user data
    }
  };

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-custom'>
      <div className='w-50 rounded p-3 bg-light shadow bgcustom0'>
        <form onSubmit={handleUpdate}>
          <h2>Update User</h2>
          <div className='mb-2'>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              className='form-control'
              value={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email'
              className='form-control'
              value={email || ''}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              id='age'
              placeholder='Enter Age'
              className='form-control'
              value={age || ''}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div className='mb-2'>
            <label>Role</label>
            <select
              className='form-control'
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value=''>Select Role</option>
              <option value='admin'>Admin</option>
              <option value='user'>User</option>
            </select>
          </div>
          <div className='mb-2'>
            <label>Gender</label>
            <div>
              <label className='me-3'>
                <input
                  type='radio'
                  name='gender'
                  value='male'
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                /> Male
              </label>
              <label className='me-3'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                /> Female
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='other'
                  checked={gender === 'other'}
                  onChange={() => setGender('other')}
                /> Other
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-success'>Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
