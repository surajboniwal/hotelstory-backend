const router = require('express').Router()
const roomsController = require('../../../controllers/hotels/rooms/rooms.controller')
const hotelMiddleware = require('./../../../middlewares/hotels.middleware')
const imagesRouter = require('./images.router')

router.use('/:id/images', hotelMiddleware.getHotelById, imagesRouter)

router.get('/', roomsController.getAll)
router.get('/:roomid', roomsController.getSingle)
router.post('/', roomsController.addRoom)
router.delete('/:roomid', roomsController.delete)

module.exports = router