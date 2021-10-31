const ApiError = require('./../../../error/api_error')
const ApiResponse = require('./../../../error/api_response')
const mongoose = require('mongoose')
const Hotel = require('./../../../schemas/hotel.schema')

class RoomsController {

    async getAll(req, res, next) {
        const hotel = req.hotel
        return next(ApiResponse.success(hotel.rooms))
    }

    async getSingle(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.roomid)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const room = req.hotel.rooms.filter((e) => e.id == req.params.roomid)[0]
        if (room == null || room == undefined) {
            return next(ApiError.notFound('Room not found'))
        }

        return next(ApiResponse.success(room))
    }

    async delete(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        if (req.hotel.rooms.filter(e => e.id === req.params.roomid).length == 0) {
            return next(ApiError.notFound('Room not found'))
        }

        const updatedRooms = req.hotel.rooms.filter(e => e.id !== req.params.roomid)

        await Hotel.updateOne({ _id: req.hotel.id }, { 'rooms': updatedRooms })

        return next(ApiResponse.success('Room deleted'))
    }

    async addRoom(req, res, next) {
        const room = {
            name: req.body.name,
            description: req.body.description,
            occupancy: req.body.occupancy,
            available: req.body.available,
            price: req.body.price,
        }

        await Hotel.updateOne({ _id: req.hotel.id }, { '$push': { rooms: room } })

        return next(ApiResponse.success('Room added'))
    }
}

module.exports = new RoomsController()