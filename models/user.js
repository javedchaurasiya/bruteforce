const mongoose = require('mongoose')

const mySchema = new mongoose.Schema({
    user_name:{
        type:String,
        required:true,
        unique:true
    },
    mail:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    general_name:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        required:false
    },
    submission:[String],
    affiliation:{
        type:String
    },
    city:{
        type:String
    },
    rating:{
        type:Number
    },
    post:[String]
},{timestamps:true})

module.exports = mongoose.model('User',mySchema)