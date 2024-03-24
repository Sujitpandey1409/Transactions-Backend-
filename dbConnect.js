// 5ovr0j9TTNVbNAyp
const mongoose = require('mongoose')
module.exports = async()=>{
    try {
        await mongoose.connect('mongodb+srv://sujitpandey1409:5ovr0j9TTNVbNAyp@cluster0.pkyls9g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
        console.log('connected to mongoDB');
    } catch (e) {
        console.error("error connecting to mongoDB",e)
    }
}