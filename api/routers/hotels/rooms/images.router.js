const router = require('express').Router()
const imagesController = require('../../../controllers/hotels/rooms/images.controller')
const imageHelper = require('../../../helpers/aws.helper')

router.get('/', imagesController.getAll)
router.get('/:imageid', imagesController.getSingle)
router.put('/', imageHelper.upload.single('image'), imagesController.uploadImage)
router.delete('/:imageid', imagesController.delete)

module.exports = router