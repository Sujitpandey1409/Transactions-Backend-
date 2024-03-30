const User = require('../models/User')
const getAllUsers = async(req,res)=>{
    try {
        const allUsers = await User.find()
        res.status(200).json(allUsers)
    } catch (error) {
        console.log(error)
    }
}
module.exports= {getAllUsers}