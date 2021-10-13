const ApiError = require('../error/api_error')
const ApiResponse = require('../error/api_response')
const User = require('./../schemas/user.schema')

class AuthController {
    async register(req, res, next) {
        if (req.user != null || req.user != undefined) {
            return next(ApiError.badRequest('Email already in use'))
        }
        await User.create(req.body)
        return next(ApiResponse.created('Registration successful'))
    }

    login(req, res, next) {
        res.json('Register')
    }
}

module.exports = new AuthController()