const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const ApiError = require('../error/api_error')

const User = mongoose.Schema({
    name: { first: String, last: String },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    password: {
        type: String,
        required: true,
        select: false,
    }
}, { versionKey: false, timestamps: true })

User.pre('save', function (next) {

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

module.exports = mongoose.model('User', User)