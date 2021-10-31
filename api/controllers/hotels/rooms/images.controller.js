const ApiError = require('../../../error/api_error')
const ApiResponse = require('../../../error/api_response')
const imageHelper = require('../../../helpers/aws.helper')
const Hotel = require('../../../schemas/hotel.schema')
const mongoose = require('mongoose')


class ImagesController {

    async getAll(req, res, next) {
        const hotel = req.hotel
        return next(ApiResponse.success(hotel.images))
    }


    async uploadImage(req, res, next) {
        await Hotel.updateOne({ _id: req.hotel.id }, {
            '$push': {
                images: {
                    key: req.file.key,
                    mimetype: req.file.mimetype,
                    size: req.file.size,
                }
            }
        })
        return next(ApiResponse.success('Image uploaded'))
    }

    async delete(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.params.imageid)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const image = req.hotel.images.filter(e => e.id === req.params.imageid)[0]

        if (image == null || image == undefined) {
            return next(ApiError.notFound('Image not found'))
        }

        imageHelper.deleteObject(image.key, async (err, data) => {
            if (err) {
                return next(ApiError.internal())
            }


            const updatedImages = req.hotel.images.filter(e => e.id !== image.id)
            await Hotel.updateOne({ _id: req.hotel.id }, { images: updatedImages })
        })

        return next(ApiResponse.success('Image deleted'))
    }

    async getSingle(req, res, next) {

        if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.params.imageid)) {
            return next(ApiError.badRequest('Invalid ID'))
        }

        const image = req.hotel.images.filter(e => e.id === req.params.imageid)[0]

        if (image == null || image == undefined) {
            return next(ApiError.notFound('Image not found'))
        }

        const imageStream = imageHelper.getObject(image.key)

        imageStream.pipe(res)

    }
}

module.exports = new ImagesController()