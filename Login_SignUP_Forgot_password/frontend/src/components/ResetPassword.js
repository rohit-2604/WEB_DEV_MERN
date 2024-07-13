import React from 'react'
import { useState } from "react";
import {useNavigate, useParams } from "react-router-dom";
import axios from 'axios'


function ResetPassword() {
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const {id, token} = useParams()

    const handleSubmit = (e) => {     
        e.preventDefault()
        axios.post(`http://localhost:5000/reset-password/${id}/${token}`, {password})
        .then(res => {
            if(res.data.Status === "Success") {
              alert("Password change successfuly")
                navigate('/login')
               
            }
        }).catch(err => console.log(err))
    }

    return(
        <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-3 rounded w-25 shadow bgcustom0 ">
        <h4>Reset Password</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>New Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-success w-100 rounded shadow">
            Update
          </button>
          </form>
        
      </div>
    </div>
    )
}

export default ResetPassword;