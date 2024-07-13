import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [role, setRole] = useState('');
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !age || !role || !gender) {
      alert('Please fill in all fields.');
      return;
    }

    axios.post('http://localhost:3000/users', { name, email, age, role, gender })
      .then(response => {
        console.log(response.data);
        navigate('/'); // Navigate to home or another route upon successful submission
      })
      .catch(error => {
        console.error('Error submitting form:', error);
        alert('Failed to submit form. Please try again.'); // Basic error handling
      });
  };

  return (
    <div className='d-flex vh-100 bg-custom justify-content-center align-items-center '>
      <div className='w-50 rounded p-3 bg-light shadow bgcustom0'>
        <form onSubmit={handleSubmit}>
          <h2>Add User</h2>
          <div className='mb-2 txt-custom '>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              id='name'
              placeholder='Enter Name'
              className='form-control' // Ensure 'form-control' class is defined in your CSS
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              id='email'
              placeholder='Enter Email'
              className='form-control'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className='mb-2 '>
            <label htmlFor='age'>Age</label>
            <input
              type='number'
              id='age'
              placeholder='Enter Age'
              className='form-control'
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
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
                  required
                /> Male
              </label>
              <label className='me-3'>
                <input
                  type='radio'
                  name='gender'
                  value='female'
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                  required
                /> Female
              </label>
              <label>
                <input
                  type='radio'
                  name='gender'
                  value='other'
                  checked={gender === 'other'}
                  onChange={() => setGender('other')}
                  required
                /> Other
              </label>
            </div>
          </div>
          <button type='submit' className='btn btn-success shadow'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
