const mongoose=require('mongoose')
const UserSchema=new mongoose.Schema({
    FirstName:{
        type:String,
        required:true
    },
    LastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    Gender:{
        type:String,
        required:true
    },
    Address:{
        type:String
    },
    DOB:{
        type:Date,
        required:true
    },
    Phone:{
        type:Number,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:true
    }
})
 const User=mongoose.model('LOGIN-SIGNUP',UserSchema)
 module.exports=User;


