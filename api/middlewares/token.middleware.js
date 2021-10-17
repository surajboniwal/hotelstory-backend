const ApiError = require("../error/api_error")
const jwt = require('jsonwebtoken')
const User = require('./../schemas/user.schema')

exports.verifyAccessToken = (req, res, next) => {

    if (!req.headers.authorization) {
        return next(ApiError.unauthorized())
    }

    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
        if (err) {
            return next(ApiError.unauthorized())
        }

        req.user = await User.findById(data.id)

        return next()
    })
}

exports.verifyAdminAccess = (req, res, next) => {
    if (req.user === undefined) {
        return next(ApiError.unauthorized())
    }

    if (req.user.role != 'admin') {
        return next(ApiError.unauthorized())
    }

    return next()
}