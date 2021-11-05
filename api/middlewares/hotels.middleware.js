const ApiError = require('../error/api_error')
const Hotel = require('./../schemas/hotel.schema')

module.exports.getHotelById = async (req, res, next) => {
    const hotel = await Hotel.findById(req.params.id).select('+rooms')

    if (hotel == null || hotel == undefined) {
        return next(ApiError.notFound('Hotel not found'))
    }

    req.hotel = hotel
    next()
}


module.exports.getRoom = async (req, res, next) => {
    const room = req.hotel.rooms.filter((e) => e.id === req.params.roomid)[0]

    if (room == null || room == undefined) {
        return next(ApiError.notFound('Room not found'))
    }

    req.room = room
    next()
}