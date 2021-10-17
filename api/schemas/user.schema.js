const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = mongoose.Schema({
    name: { first: String, last: String },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    accountStatus: {
        type: String,
        enum: ['unverified', 'verified'],
        default: 'unverified'
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