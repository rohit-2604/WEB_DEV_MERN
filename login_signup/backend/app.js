const express=require('express')
const cors=require('cors')
const path=require('path')
require("dotenv").config()
require("./connectdb/database")
const router=require('./Routers/router')
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