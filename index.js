const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
const express = require('express')
const App = express()
const cors = require('cors')
const routers = require('./routers/routers')
const dbConnect = require('./dbConnect')

dotenv.config("./env")
App.use(cors())
App.use(express.json())
App.use(cookieParser())

App.get('/',(req,res)=>{res.json('hello from server')})
App.use('/api',routers)
dbConnect();
const PORT = process.env.PORT||4001
App.listen(PORT,()=>console.log("listening on port: ",PORT))


