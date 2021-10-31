const router = require('express').Router()
const UsersController = require('./../controllers/users.controller')

router.get('/', UsersController.getUsers)
router.get('/:id', UsersController.getSingleUser)

module.exports = router