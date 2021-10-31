const ApiError = require('../error/api_error')
const ApiResponse = require('../error/api_response')

class AuthController {

    async getProfile(req, res, next) {
        if (req.user == null || req.user == undefined) {
            return next(ApiError.unauthorized())
        }
        return next(ApiResponse.success(req.user))
    }
}

module.exports = new AuthController()