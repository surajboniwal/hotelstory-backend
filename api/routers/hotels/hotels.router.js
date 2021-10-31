const router = require('express').Router()
const HotelsController = require('../../controllers/hotels/hotels.controller')
const roomsRouter = require('./rooms/rooms.router')
const imagesRouter = require('./images.router')
const hotelMiddleware = require('./../../middlewares/hotels.middleware')

router.use('/:id/rooms', hotelMiddleware.getHotelById, roomsRouter)
router.use('/:id/images', hotelMiddleware.getHotelById, imagesRouter)

router.post('/', HotelsController.addHotel)
router.get('/', HotelsController.getAll)
router.get('/:id', HotelsController.getSingle)
router.delete('/:id', HotelsController.delete)


module.exports = router