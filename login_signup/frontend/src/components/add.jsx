
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Add = () => {
     
  const [users,setUsers]=useState([])

  useEffect(()=>{
    axios.post('http://localhost:5000/api/crudshow')
    .then(result => {
      setUsers(result.data)
      // console.log(result.data)
    }
    )
    .catch(err => console.log(err))
  },[])
  
  const handleDelete=(id)=>{
    axios.delete('http://localhost:5000/api/deleteStudent/'+id)
    .then(res =>{
        alert(res.data.message)
        window.location.reload()
    })
    .catch(err => console.log(err))
  }


  
    return (
    <div className='d-flex vh-100 bg-primary justify-content-center alig-items-center'>
      <div className='w-50 h-50 bg-white rounded p-3 m-auto shadow'>
      <Link to='/dashboard' className='btn btn-success shadow mb-3'>&#8656;</Link>
      <Link to='/create' className='btn btn-success ms-3 shadow mb-3'>Add +</Link>
      <h3 className='bgcustom0 shadow rounded'>Total User {users.length}</h3>
        <table className='table bgcustom0 shadow'>

            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>City</th>
                    <th>Phone</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
             
            {users.map((user)=>{
                return<tr >
                    <td>{user.name}</td>
                    <td>{user.gender}</td>
                    <td>{user.DOB}</td>
                    <td>{user.city}</td>
                    <td>{user.Ph}</td>
                    <td><Link to={`/update/${user._id}`} className='btn btn-success shadow mb-3'>Update</Link>
                    <button className='btn btn-danger shadow' onClick={(e) => handleDelete(user._id)}>Delete</button>
                    </td>
                </tr>
            })}

            </tbody>
            </table>
      </div>
    </div>
  )
}

export default Add
