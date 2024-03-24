const mongoose = require('mongoose') 

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    balance:{
        type:String,
        default:'4500'
    }
})
module.exports = mongoose.model("user", userSchema)