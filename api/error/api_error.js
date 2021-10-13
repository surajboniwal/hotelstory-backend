class ApiError extends Error {
    constructor(statusCode, msg) {
        super()
        this.statusCode = statusCode
        this.msg = msg
    }

    static badRequest(msg) {
        return new ApiError(400, msg)
    }

    static unprocessableEntity(errors) {
        return new ApiError(422, errors.errors)
    }

    static unauthorized(msg) {
        return new ApiError(401, msg)
    }

    static forbidden(msg) {
        return new ApiError(403, msg)
    }

    static notFound(msg) {
        return new ApiError(404, msg)
    }

    static internal(msg) {
        return new ApiError(500, msg)
    }

}

module.exports = ApiError