const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    region: process.env.AWS_BUCKET_REGION,
})

module.exports.upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname })
        },
        key: (req, file, cb) => {
            cb(null, `${Date.now().toString()}.${file.originalname.split('.')[1]}`)
        }
    })
})


module.exports.deleteObject = (key, cb) => {
    s3.deleteObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }, (err, data) => {
        cb(err, data)
    })
}

module.exports.getObject = (key) => {
    return s3.getObject({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key
    }).createReadStream()
}