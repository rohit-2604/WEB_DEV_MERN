import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Error from './components/Error';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PrivateRoute from'./components/PrivateRoute'
import EditProfile from './components/EditProfile';
import Create from './components/Create'
import Add from './components/add'
import Update from'./components/Update'
const App =()=>{
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path='/' element={<PrivateRoute><Login/></PrivateRoute> }></Route>
        <Route path='/login' element={<PrivateRoute><Login/></PrivateRoute> }></Route>
        <Route path='/Register' element={<PrivateRoute><Signup/></PrivateRoute> }></Route>
        <Route path='/editProfile' element={<EditProfile/>}></Route>
        <Route path='/*' element={<Error/>}></Route>
        <Route path='/List' element={<Add/>}></Route>
      <Route path='/create' element={<Create/>}></Route>
      <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route></Routes>
      </BrowserRouter>
    </>
  );
};

export default App;