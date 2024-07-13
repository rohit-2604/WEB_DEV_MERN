const express=require('express')
const cors=require('cors')
const path=require('path')
require("dotenv").config()
require("./connectdb/database")
const router=require('./Routers/router')
const nodemailer=require('nodemailer')
const UserModel=require('./models/user')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')
const app=express()
const port=5000

//middleware
app.use(express.json())
app.use(cors())

app.use('/api',router)//path for connect 
//Static folder for serving uploaded files// Serve static files from the 'uploads' directory
app.use('/upload', express.static(path.join(__dirname, 'upload')));


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})

app.post('/forgot-password', (req, res) => {
    const {email} = req.body;
    UserModel.findOne({email: email})
    .then(user => {
        if(!user) {
            return res.send({Status: "User not existed"})
        } 
        const token = jwt.sign({id: user._id}, "jwt_secret_key", {expiresIn: "1d"})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'neogirohit872@gmail.com',
                    pass: 'zvjf eobz ircz hget'
            }
          });
        //   console.log(email)
          var mailOptions = {
            from: 'neogirohit872@gmail.com',
            to: email,
            subject: 'Reset Password Link',
            text: `http://localhost:3000/reset-password/${user._id}/${token}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              return res.send({Status: "Success"})
            }
          });
    })
})


app.post('/reset-password/:id/:token', (req, res) => {
    const {id, token} = req.params
    const {password} = req.body
    console.log("Reset password Called")
    jwt.verify(token, "jwt_secret_key", (err, decoded) => {
        if(err) {
            return res.json({Status: "Error with token"})
        } 
        else {
            bcrypt.hash(password, 10)
            .then(hash => {
                UserModel.findByIdAndUpdate({_id: id}, {Password: hash})
                .then(u => res.send({Status: "Success"}))
                .catch(err => res.send({Status: err}))
            })
            .catch(err => res.send({Status: err}))
        }
    })
})