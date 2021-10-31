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