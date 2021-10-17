const jwt = require('jsonwebtoken')

exports.buildAccessToken = (id, age) => jwt.sign({ id: id }, process.env.ACCESS_TOKEN_SECRET, age === undefined ? undefined : { expiresIn: age })

exports.buildAccountVerifyAccessToken = (id) => jwt.sign({ id: id }, process.env.ACCOUNT_VERIFY_TOKEN_SECRET, { expiresIn: '10m' })

exports.decodeAccountVerifyAccessToken = async (token) => {
    jwt.verify(token, process.env.ACCOUNT_VERIFY_TOKEN_SECRET, (err, data) => {
        if (err) {
            return undefined
        }
        return data
    })
}