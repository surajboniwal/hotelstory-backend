const User = require('../schemas/user.schema')

module.exports.getUserByEmail = async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email }).select('+password')
    req.user = user
    next()
}

// module.exports.getUserByToken = async (req, res, next) => {
//     const user = await 
// }