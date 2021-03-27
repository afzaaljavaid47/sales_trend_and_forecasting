const mongoose = require('mongoose');
const UserRegistrationShema=new mongoose.Schema({
    fname:{
        type:String,
        require:true
    },
    lname:{
        type:String,
        require:true
    },
    uname:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
    ,
    password:{
        type:String,
        required:true
    },
    DataUploaded:{
        type:Boolean,
        default: false
    },
})
var UserRegistrationModel=mongoose.model('users',UserRegistrationShema)
module.exports=UserRegistrationModel