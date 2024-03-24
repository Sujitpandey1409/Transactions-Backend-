const router  = require('express').Router();
const {loginController,signupController,deleteController} = require('../controllers/authController')

router.post('/login',loginController)
router.post('/signup',signupController)
router.delete('/',deleteController)

module.exports = router    