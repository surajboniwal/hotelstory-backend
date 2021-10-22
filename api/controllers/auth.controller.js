const ApiError = require('../error/api_error')
const ApiResponse = require('../error/api_response')
const User = require('./../schemas/user.schema')
const bcrypt = require('bcryptjs')
const jwtHelper = require('./../helpers/jwt.helper')
const jwt = require('jsonwebtoken')
const nodemailerHelper = require('./../helpers/nodemailer.helper')

class AuthController {

    async register(req, res, next) {
        if (req.user != null || req.user != undefined) {
            return next(ApiError.badRequest('Email already in use'))
        }

        const { name, email, password } = req.body

        const user = User({
            name,
            email,
            password
        })

        await user.save()

        const verifyToken = jwtHelper.buildAccountVerifyAccessToken(user.id)

        await nodemailerHelper.sendVerificationEmail(user, verifyToken)

        return next(ApiResponse.created('Verification mail sent'))
    }

    login(req, res, next) {
        if (req.user == null) {
            return next(ApiError.unauthorized('Invalid credentials'))
        }

        if (!bcrypt.compareSync(req.body.password, req.user.password)) {
            return next(ApiError.unauthorized('Invalid credentials'))
        }

        if (req.user.accountStatus == 'unverified') {
            return next(ApiError.forbidden('Account not verified'))
        }

        return next(ApiResponse.success({
            token: jwtHelper.buildAccessToken(req.user.id)
        }))
    }

    async verifyAccount(req, res, next) {

        jwt.verify(req.params.token, process.env.ACCOUNT_VERIFY_TOKEN_SECRET, async (err, data) => {
            if (err) {
                return next(ApiError.unauthorized())
            }

            const user = await User.findById(data.id)

            if (user == undefined) {
                return next(ApiError.unauthorized())
            }

            if (user.accountStatus !== 'unverified') {
                return next(ApiError.badRequest('User already verified'))
            }

            await User.updateOne({
                _id: user._id,
            }, {
                'accountStatus': 'verified'
            })

            return next(ApiResponse.success('Account verified'))
        })
    }
}

module.exports = new AuthController()