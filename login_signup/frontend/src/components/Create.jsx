import {React,useState } from 'react';
import axios from 'axios';
import {useNavigate,Link} from "react-router-dom"
import { ToastContainer }  from 'react-toastify'
import "react-bootstrap"
import "bootstrap"

const Create = () => {
const navigate = useNavigate();
const [formData,setFormData]=useState({
    name:"",
    Gen:"",
    DOB:"",
    Ph:"",
    city:""
    });
const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
    e.preventDefault()
        await axios.post('http://localhost:5000/api/crudadd',formData)
        .then(res => {
          console.log("API called")
          if(res.status===200)
            {
              alert(res.data.success)
              navigate("/List")
            }
          })
          .catch(error => {
            alert(error.res.data.error)
          });
      }
    
    


  return (
    <>
  <div className='container-fluid'>
    <div className='row mt-5 '>
      <div className='col-md-4 offset-md-4 border border-success rounded-2 shadow-lg p-3 mb-5 bg-body rounded formcustom0'>

    
  <form onSubmit={handleSubmit} >

    <div className="form-group formcustom0">
      <label htmlFor="FName">Name</label>
      <input type="text" className="form-control" id="FName" name="name" required placeholder ="Enter Your Full Name" onChange={handleChange} />
    </div>    
    
    <div className="form-group formcustom0">
      <label>Gender</label>
      <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gen" id="male" Value="Male" onChange={handleChange}  />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check form-check-inline ">
          <input className="form-check-input" type="radio" name="Gen" id="female" Value="Female" onChange={handleChange} />
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gen" id="other" Value="Other" onChange={handleChange}  />
          <label className="form-check-label" htmlFor="other">Other</label>
        </div>
      </div>
    </div>
    <div className="form-check form-check-inline formcustom0">
      <label htmlFor="Number">Number</label>
      <input type="Number" required className="form-control" id="Number" placeholder="Enter Your Mobile Number" name="Ph" onChange={handleChange}  />
    </div>

    <div className="form-group formcustom0">
      <label htmlFor="DOB">Date of Birth</label>
      <input type="date"required  className="form-control" id="DOB" name="DOB"  onChange={handleChange} />
    </div>

    <div className="mb-2 formcustom0">
            <label>City</label>
            <select
              className="form-control"
              onChange={handleChange}
              name='city'
              required 
            >
              <option value="">Select City</option>
              <option value="Kolkata">Kolkata</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>
<div className="text-center">
    <button type="submit" className="btn btn-success mt-2 middle shadow">Submit</button><br />
   

<Link to="/" className="btn btn-success mt-2 middle shadow" >Go back To Home </Link>
  

 </div>
 <ToastContainer />
  </form>


  </div>
  </div>
  </div>
    </>
  )
}
export default Create