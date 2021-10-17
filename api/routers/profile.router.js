const router = require('express').Router()
const ProfileController = require('./../controllers/profile.controller')

router.get('/', ProfileController.getProfile)

module.exports = router