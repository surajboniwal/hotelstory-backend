const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')
const AuthValidation = require('../middlewares/validation/auth.validation')
const userMiddleware = require('../middlewares/user.middleware')
const tokenMiddleware = require('../middlewares/token.middleware')

router.post('/register', AuthValidation.register, userMiddleware.getUserByEmail, AuthController.register)
router.post('/login', AuthValidation.login, userMiddleware.getUserByEmail, AuthController.login)

router.get('/verify/:token', AuthController.verifyAccount)

module.exports = router