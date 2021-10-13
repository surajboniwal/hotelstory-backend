class AuthController {
    getAllUsers(req, res, next) {
        res.json('All users')
    }
}

module.exports = new AuthController()