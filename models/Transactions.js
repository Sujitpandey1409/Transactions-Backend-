const user = require('./User')
const mongoose = require('mongoose');
const TransactionsSchema = mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:user
    },
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    balance:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
})
module.exports = mongoose.model('transaction',TransactionsSchema)