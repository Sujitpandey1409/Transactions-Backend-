const user = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupController = async(req,res)=>{
    try {
        const {name, email, password} = req.body
        if(!name || !email || !password){
            return res.status(400).json('All fields are required')
        }
        console.log(name,email,password,user)
        const userPresence = await user.findOne({email})
        if(userPresence){
            return res.status(409).json("User is already registered")
        }
        const hashedPass = await bcrypt.hash(password,10)
        const createdUser = await user.create({name, email, password:hashedPass})
        res.status(201).json("User created successfully")
        console.log(createdUser)
    } catch (e) {
        res.status(500).send({"errore":e.message})
    }
}

const loginController = async (req,res)=>{
    try {        
        console.log(req.body);
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json('All fields are required')
        }
        const userPresence = await user.findOne({email}).select("+password")
        const allUser = await user.find()
        if (!userPresence){return res.status(404).json('User not found')}
        console.log("userPresence:",userPresence, "allUser",allUser);
        const matched = await bcrypt.compare(password, userPresence.password)
        if(!matched){return res.status(403).json('Incorrect password')}
        const accessToken = generateAccessToken({_id:user._id})
        res.status(200).json({accessToken,_id:userPresence._id,name:userPresence.name, balance:userPresence.balance})
    } catch (e) {
        res.status(500).send({"errore":e.message})
    }
    }

const deleteController = async(req, res)=>{
    const {id} = req.params
    try {
        await user.findByIdAndDelete(id)
        res.json('data deleted successfully')
    } catch (error) {
        console.error(error)
    }
}    

const generateAccessToken = (data)=>{
    try {
        const key = process.env.ACCESS_TOKEN_PRIVATE_KEY
        const token = jwt.sign(data, key,{expiresIn:"1d"})
        console.log(token);
        return token
    } catch (error) {
        console.log(error);
    }
}    

module.exports = {loginController,signupController,deleteController}    