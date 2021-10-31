const api = require('express').Router()
const routers = require('./routers/routers')
const tokenMiddleware = require('./middlewares/token.middleware')

api.get('/', (req, res) => res.json({ status: true, message: "Welcome to HotelStory" }))
api.use('/auth', routers.auth)
api.use('/profile', tokenMiddleware.verifyAccessToken, routers.profile)
api.use('/users', tokenMiddleware.verifyAccessToken, tokenMiddleware.verifyAdminAccess, routers.users)
api.use('/hotels', tokenMiddleware.verifyAccessToken, tokenMiddleware.verifyAdminAccess, routers.hotels)

module.exports = api