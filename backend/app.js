const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./routes/app')

dotenv.config()

mongoose
    .connect(process.env.PRODUCTION === "true" ? process.env.DB_URI_PRODUCTION : process.env.DB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error))

module.exports = app
