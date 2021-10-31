const ApiError = require('../error/api_error')
const ApiResponse = require('../error/api_response')
const User = require('./../schemas/user.schema')
const mongoose = require('mongoose')

class UsersController {

    async getUsers(req, res, next) {
        const users = await User.find()
        return next(ApiResponse.success(users))
    }

    async getSingleUser(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const user = await User.findById(req.params.id)
        if (user == null || user == undefined) {
            return next(ApiError.notFound('User not found'))
        }

        return next(ApiResponse.success(user))
    }
}

module.exports = new UsersController()