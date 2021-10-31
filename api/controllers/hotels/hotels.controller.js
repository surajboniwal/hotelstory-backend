const ApiError = require('../../error/api_error')
const ApiResponse = require('../../error/api_response')
const Hotel = require('../../schemas/hotel.schema')
const mongoose = require('mongoose')

class HotelsController {

    async getAll(req, res, next) {
        const hotels = await Hotel.find()
        return next(ApiResponse.success(hotels))
    }

    async getSingle(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const hotel = await Hotel.findById(req.params.id)
        if (hotel == null || hotel == undefined) {
            return next(ApiError.notFound('Hotel not found'))
        }

        return next(ApiResponse.success(hotel))
    }

    async delete(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const hotel = await Hotel.findById(req.params.id)
        if (hotel == null || hotel == undefined) {
            return next(ApiError.notFound('Hotel not found'))
        }

        const status = await hotel.remove()

        if (status == null || status == undefined) {
            return next(ApiError.internal())
        }

        return next(ApiResponse.success('Hotel deleted'))
    }

    async addHotel(req, res, next) {
        const hotel = await Hotel.create({
            name: req.body.name,
            address: req.body.address,
        })

        if (hotel == null || hotel == undefined) {
            return next(ApiError.internal())
        }

        return next(ApiResponse.success(hotel))
    }
}

module.exports = new HotelsController()