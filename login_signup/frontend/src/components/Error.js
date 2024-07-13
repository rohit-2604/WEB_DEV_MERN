import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import'./Error.css'
import { Link } from 'react-router-dom';
const Error = () => {
  return (
    <div>
<Link className='btn btn-primary align-end m-sm-5 ' to="/" >Back To Home Page</Link> 
    <center>
  <img src={require('./404.png')} className={'border border-primary border-5 rounded-4 glow'}width={"60%"}/>
</center>
</div>

  )
}

export default Error