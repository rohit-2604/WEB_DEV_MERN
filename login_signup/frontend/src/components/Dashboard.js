import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    const verifyToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

    if (!token) {
      navigate('/login');
    } else {
      setUser(verifyToken);
    }
  }, [navigate]);

  const handleLogout = () => {
    Cookies.remove('token');
    navigate('/login');
  };
const handleAddProfile=()=>{
  navigate('/create')
}
const handleListProfile=()=>{
  navigate('/List')
}
  const handleEditProfile = () => {
    navigate('/editProfile');
  };

  const handleDeleteAccount = async () => {
    try {
      const token = Cookies.get('token');
      const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;
      const userEmail = decodedToken.email; // Extract email from decoded token

      const response = await fetch(`http://localhost:5000/api/delete-account`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email: userEmail }),
      });

      if (response.ok) {
        // Account deletion successful
        Cookies.remove('token');
        navigate('/login');
      } else {
        // Handle error response
        console.error('Failed to delete account');
        // Optionally show an error message to the user
      }
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto formcustom0" style={{ maxWidth: '400px' }}>
        <div className="card-header bg-primary text-white">
          <h2 className="card-title text-center mb-0">Welcome, {user && user.name}</h2>
        </div>
        <div className="card-body text-center">
          {user && (
            <>
              <img
                src={user.photo ? `http://localhost:5000/${user.photo}` : '/default-profile.png'}
                alt="Profile"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover', border: '4px solid #fff' }}
              />
              <p className="card-text mb-4">Welcome back! You're logged in.</p>
              <div>
                <button className="btn btn-success btn-block shadow mt-3" onClick={handleAddProfile}>Add New User</button>
                <button className="btn btn-success btn-block mt-3 mx-2 shadow" onClick={handleListProfile}>Total User List</button>
              </div>
              <div>
                <button className="btn btn-danger btn-block mt-3 mx-2 shadow" onClick={handleLogout}>Logout  </button>
              
                <button className="btn btn-primary btn-block mt-3 mx-2 shadow" onClick={handleEditProfile}>Edit Profile </button>
      
                <button className="btn btn-warning btn-block mt-3 shadow" onClick={handleDeleteAccount}>Delete Account  </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
