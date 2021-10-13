const ApiError = require('./api_error')

const apiErrorHandler = (err, req, res, next) => {
    console.error(err)

    if (err instanceof ApiError) {
        return res.status(err.statusCode).json(err.msg)
    }

    return res.status(500).json('Something went wrong')
}

module.exports = apiErrorHandler