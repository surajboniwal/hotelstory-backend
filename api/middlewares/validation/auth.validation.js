const { body, validationResult } = require('express-validator')
const ApiError = require('./../../error/api_error')

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(ApiError.unprocessableEntity(errors))
    }
    next()
}

module.exports.register = [
    body('name.first').exists().withMessage('Firstname is required'),
    body('name.last').exists().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password').exists().withMessage('Password is required'),
    validateRequest
]


module.exports.login = [
    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('password').exists().withMessage('Password is required'),
    validateRequest
]
