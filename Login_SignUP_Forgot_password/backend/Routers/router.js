const express=require('express')
const controllers=require('../controller/authcontroller')
const crud=require("../crud/crudadd")
const scrud=require("../crud/showcrud")
const ucrud=require("../crud/update")
const multer=require('multer')
const studentModel = require('../models/crud')
const router=express.Router()


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'upload/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });
  
  const upload = multer({ storage });

  router.delete('/deleteStudent/:id', (req, res) => {
    const id = req.params.id;
    studentModel.findByIdAndDelete({ _id: id })
      .then(() => res.json({ message: 'Student deleted successfully' }))
      .catch(err => res.json(err));
  });
//Router 
router.post("/registation",upload.single('image'),controllers.UserRegister)//For Registation
router.post("/login",controllers.userlogin)//For Login
router.put('/editprofile', upload.single('image'), controllers.editProfile);//for edit self
router.delete('/delete-account',controllers.deleteAccount)//For Delete Account
router.post('/crudadd',crud.crudcreate)//For Create
router.post('/crudshow',scrud.crudshow)//For show
router.get('/updateStudent/:id',ucrud.rupdate)//For reload show
router.put('/editStudent/:id',ucrud.update)//For update
module.exports=router