const mongoose = require('mongoose')

class Database {
    connect() {
        mongoose.connect(process.env.MONGO_URL)
    }
}