const router = require("express").Router()
const authRouter = require("./authRouter")
const transactionRouter = require("./transactionsRouter")
const getAllUsers = require("./userRouter")

router.use('/auth',authRouter)
router.use('/transaction',transactionRouter)
router.use('/user',getAllUsers)

module.exports = router