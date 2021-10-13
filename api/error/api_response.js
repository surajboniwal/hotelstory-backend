class ApiResponse {
    constructor(statusCode, data) {
        this.statusCode = statusCode
        this.data = data
    }

    static created(data) {
        return new ApiResponse(201, data)
    }
}

module.exports = ApiResponse