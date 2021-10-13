const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const AuthValidation = require('../middlewares/validation/auth.validation')
const userMiddleware = require('../middlewares/user.middleware')

router.post('/register', AuthValidation.registerValidation, userMiddleware.getUserByEmail, AuthController.register)
router.post('/login', AuthController.login)

module.exports = router