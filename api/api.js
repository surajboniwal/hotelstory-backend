const api = require('express').Router()
const routers = require('./routers/routers')

api.get('/', (req, res) => res.json({ status: true, message: "Welcome to HotelStory" }))
api.use('/auth', routers.auth)

module.exports = api