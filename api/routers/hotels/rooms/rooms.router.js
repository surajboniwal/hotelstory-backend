const router = require('express').Router()
const roomsController = require('../../../controllers/hotels/rooms/rooms.controller')
const hotelMiddleware = require('./../../../middlewares/hotels.middleware')
const imagesRouter = require('./images.router')

router.use('/:roomid/images', hotelMiddleware.getRoom, imagesRouter)

router.get('/', roomsController.getAll)
router.get('/:roomid', hotelMiddleware.getRoom, roomsController.getSingle)
router.post('/', roomsController.addRoom)
router.delete('/:roomid', roomsController.delete)

module.exports = router