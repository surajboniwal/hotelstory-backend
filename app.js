require('dotenv').config()
const express = require('express')
const app = express()
const apiResponseHandler = require('./api/error/response.middleware')
const mongoose = require('mongoose')
const path = require('path')


app.use(express.json())
app.use('/api', require('./api/api'))
app.use(apiResponseHandler)

mongoose.connect(process.env.MONGO_URL, () => {
    app.listen(process.env.PORT, () => console.log('Server started🚀'))
})
