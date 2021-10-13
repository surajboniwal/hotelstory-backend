const { body, validationResult } = require('express-validator')
const ApiError = require('./../../error/api_error')

const validateRequest = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return next(ApiError.unprocessableEntity(errors))
    }
    next()
}

module.exports.registerValidation = [
    body('firstName').exists().withMessage('Firstname is required'),
    body('lastName').exists().withMessage('Lastname is required'),
    body('email').isEmail().withMessage('Please enter a valid email address').normalizeEmail(),
    body('phone').isMobilePhone().withMessage('Please enter a valid phone number'),
    body('password').exists().withMessage('Password is required'),
    validateRequest
]
