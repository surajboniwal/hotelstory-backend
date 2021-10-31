const mongoose = require('mongoose')

const HotelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    description: String,
    rating: Number,
    images: [{
        key: String,
        mimetype: String,
        size: String,
    }],
    rooms: {
        type: [{
            title: String,
            description: String,
            occupancy: Number,
            available: Number,
            price: Number,
        }],
        select: false
    }
}, { versionKey: false, timestamps: true })

module.exports = mongoose.model('Hotel', HotelSchema)