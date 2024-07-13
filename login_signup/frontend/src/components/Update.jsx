import {React,useState,useEffect} from 'react';
import axios from 'axios';
import {useParams,useNavigate,Link} from "react-router-dom"
import "react-bootstrap"
import "bootstrap"

const Update = () => {
  const { id } = useParams()
const navigate = useNavigate();
const [formData,setFormData]=useState({
    name:"",
    Gen:"",
    DOB:"",
    Ph:"",
    city:"Kolkata"
    });
    useEffect(() => {
      axios.get('http://localhost:5000/api/updateStudent/' + id)
        .then(response => {
          
          const user = response.data;
          setFormData({
            name: user.name,
            Gen: user.age,
            DOB: user.DOB,
            Ph: user.Ph,
            city: user.city
          });
        })
        .catch(error => {
          console.error("There was an error fetching the data:", error);
        });
    }, [id]);

const handleChange=e=>{
    setFormData({...formData,[e.target.name]:e.target.value})
}

const handleSubmit=async (e)=>{
    e.preventDefault()
        await axios.put('http://localhost:5000/api/editStudent/'+id,formData)
        .then(res => {
          console.log("API called")
          if(res.status===200)
            {
              alert(res.data.message)
              navigate("/List")
            }
          })
          .catch(error => {
            // console.log("hiii");
            alert(error.response.data.error)
          });
      }
    


  return (
    <>
  <div className='container-fluid'>
    <div className='row mt-5 '>
      <div className='col-md-4 offset-md-4 border border-success rounded-2 shadow-lg p-3 mb-5 bg-body rounded'>

    
  <form onSubmit={handleSubmit} >

    <div className="form-group formcustom0">
      <label htmlFor="FName">Name</label>
      <input type="text" className="form-control" id="FName" name="name"  placeholder ="Enter Your Full Name" onChange={handleChange} />
    </div>    
    
    <div className="form-group formcustom0">
      <label>Gender</label>
      <div>
        <div className="form-check form-check-inline">
          <input className="form-check-input" type="radio" name="Gen" id="male" Value="Male" onChange={handleChange}  />
          <label className="form-check-label" htmlFor="male">Male</label>
        </div>
        <div className="form-check form-check-inline">
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
      <input type="Number"  className="form-control " id="Number" placeholder="Enter Your Mobile Number" name="Ph" onChange={handleChange}  />
    </div>

    <div className="form-group formcustom0">
      <label htmlFor="DOB">Date of Birth</label>
      <input type="date" className="form-control " id="DOB" name="DOB"  onChange={handleChange} />
    </div>

    <div className="mb-2 formcustom0">
            <label>City</label>
            <select
              className="form-control"
              onChange={handleChange}
              name='city'
               
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
   

<Link to="/List" className="btn btn-success mt-2 middle shadow" >Go back To List </Link>
  

 </div>

  </form>


  </div>
  </div>
  </div>
    </>
  )
}
export default Update