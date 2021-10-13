const mongoose = require('mongoose')

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
        required: true
    }
}, { versionKey: false, timestamps: false })

module.exports = mongoose.model('User', User)