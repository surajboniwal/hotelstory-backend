const router = require('express').Router()
const AuthController = require('../controllers/auth.controller')

router.get('/', AuthController.getAllUsers)

module.exports = router