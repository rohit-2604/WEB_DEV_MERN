import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/users/${id}`)
      .then(res => {
        console.log('User deleted successfully:', res.data);
        setUsers(users.filter(user => user._id !== id));
      })
      .catch(err => {
        console.error('Error deleting user:', err);
        // Optionally: Handle error state or display an error message
      });
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-custom">
      <div className="w-75 bg-light rounded p-3 shadow">
        <div className="d-flex justify-content-between align-items-center mb-3 ">
          <h2>Users</h2>
          <Link to="/create" className="btn btn-success shadow">
            Add New User
          </Link>
        </div>
        <table className="table ">
          <thead>
            <tr className="shadow">
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Role</th>
              <th>Gender</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
                <td>{user.gender}</td>
                <td>
                  <Link to={`/update/${user._id}`} className="btn btn-primary me-2">
                    Update
                  </Link>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
