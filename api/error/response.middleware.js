const ApiError = require("./api_error")
const ApiResponse = require("./api_response")

const apiResponseHandler = (data, req, res, next) => {

    if (data instanceof Error) {
        if (data instanceof ApiError) {
            return res.status(data.statusCode).json({ status: false, error: data.msg })
        }
        return res.status(500).json({ status: false, error: 'Something went wrong' })
    }

    if (data instanceof ApiResponse) {
        return res.status(data.statusCode).json({ status: true, data: data.data })
    }

}

module.exports = apiResponseHandler