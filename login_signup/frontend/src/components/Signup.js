import {React,useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast }  from 'react-toastify'
import {useNavigate,Link} from "react-router-dom"
import "react-bootstrap"
import "bootstrap"
import "./Register.css"

const Signup = () => {
const navigate = useNavigate();
const [image,setImage]=useState(null)
const [formData,setFormData]=useState({
    FName:"",
    LName:"",
    email:"",
    Gender:"",
    Add:"",
    DOB:"",
    Ph:"",
    Pass:"",
    CPass:"",
    });
const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
    e.preventDefault()
    
    const{FName,LName,email,Gender,Add,DOB,Ph,Pass,CPass}=formData
    console.log(FName)
    console.log(image)
    
    if(FName === ""||LName==="")
      {
        toast.error("Enter Your Name")
      }
        else if(Add === " ")
        {
          toast.error("Please Enter Your Address")
        }
        
        else if(Gender ===" ")
          {
            toast.error("Please Select Your Gender")
          }
          else if(image ===''){
            toast.error("Please Upload Your Profile Picture")
          }
          else if(email === "")
            {
              toast.error("Enter Your Email")
      }
      else if(!email.includes("@"))
        {
        toast.error("Enter Valid Email")
      }
      else if(Ph=== "")
        {
          toast.error(" Phone Number Is not Add")
        }
        else if(Ph.length < 10)
        {
          toast.error(" Phone Number Is not valided")
        }
        else if(DOB==='')
          {
            toast.error("Please Enter Your Date of Birth")
          }
          else if(Pass === ''  || CPass === '')
            {
              toast.error("Enter Your Password")
            }
    else if(Pass.length < 6 ){
        toast.error("password length minimum 6 character")
      }
      // else if(CPass.length < 6){
        // toast.error("confirm password length minimum 6 character")
        // }
        else if(Pass !== CPass)
          {
            toast.error("Password doesn't Match")
          }
          else{
            if (image) {
              console.log(image)
        formData.image=image;
        }
        console.log(formData)
        // console.log("hiiii");
        await axios.post('http://localhost:5000/api/registation',formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })
        .then(res => {
          console.log("API called")
          if(res.status===200)
            {
              toast.success("Registration Successfull")
              navigate("/login")
            }
            // navigate('/');
          })
          .catch(error => {
            toast.error(error.response.data.error);
          });
      }
    
    }


  return (
    <>
    <div className="container pb-2 formcustom0">
  <h2 className='text-center p-2 '>User Registration Form</h2>
  
  <form onSubmit={handleSubmit}>
    <div className="form-group formcustom0">
      <label htmlFor="FName">First Name</label>
      <input type="text" className="form-control" id="FName" name="FName" onChange={handleChange}  />
    </div>
    <div className="form-group formcustom0">
      <label htmlFor="LName">Last Name</label>
      <input type="text" className="form-control" id="LName" name="LName" onChange={handleChange} />
    </div>

    <div className="form-group formcustom0">
      <label htmlFor="Add">Address</label>
      <textarea className="form-control" id="Add" name="Add" rows={1}  onChange={handleChange} />
    </div>
    
    
    <div className="form-group formcustom0">
      <label>Gender</label>
      <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gender" id="male" Value="Male" onChange={handleChange}  />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gender" id="female" Value="Female" onChange={handleChange} />
          <label className="form-check-label" htmlFor="female">Female</label>
        </div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gender" id="other" Value="Other" onChange={handleChange}  />
          <label className="form-check-label" htmlFor="other">Other</label>
        </div>
      </div>
    </div>
      <div className="form-group formcustom0">
        <label htmlFor="image">Photo</label><br/><br/>
        <input type="file" className="form-control-file" id="image" name="image" onChange={(e) => setImage(e.target.files[0])} />
      </div>

    <div className="form-group formcustom0">
      <label htmlFor="email">Email address</label>
      <input type="email" className="form-control formcustom0" id="email" name="email" onChange={handleChange}  />
      <label htmlFor="Number">Number</label>
      <input type="Number" className="form-control" id="Number" name="Ph" onChange={handleChange}  />
    </div>
    <div className="form-group formcustom0">
      <label htmlFor="DOB">Date of Birth</label>
      <input type="date" className="form-control" id="DOB" name="DOB"  onChange={handleChange} />
    </div>
    <div className="form-group formcustom0">
      <label htmlFor="Pass">Password</label>
      <input type="Password" className="form-control" id="Pass" name="Pass"  onChange={handleChange} />
    </div>
    <div className="form-group formcustom0">
      <label htmlFor="CPass">Confirm Password</label>
      <input type="Password" className="form-control" id="CPass" name="CPass" onChange={handleChange} />
    </div>
    <button type="submit" className="btn btn-primary mt-2 middle shadow mb-3">Submit</button>
   
<div className="text-center">

<Link to="/" >Login Here If You Account?</Link>
  

 </div>
 <ToastContainer />
  </form>
</div>


    </>
  )
}

export default Signup