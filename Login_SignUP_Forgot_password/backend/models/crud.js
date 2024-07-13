const mongoose=require('mongoose')
const Schema=new mongoose.Schema({
    name:String,
    gender:String,
    city:String,
    DOB:Date,
    Ph:Number
})
const Crud=mongoose.model('collection',Schema)
module.exports=Crud