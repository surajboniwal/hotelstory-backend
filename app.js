require('dotenv').config()
const express = require('express')
const app = express()
const apiErrorHandler = require('./api/error/error.middleware')

app.use(express.json())
app.use('/api', require('./api/api'))

app.use(apiErrorHandler)

app.listen(process.env.PORT)