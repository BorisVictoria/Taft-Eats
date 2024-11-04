const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.PRODUCTION === 'true' ? process.env.DB_URI_PRODUCTION : process.env.DB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Database connected')
    } catch (error) {
        console.error('Database connection error:', error)
        process.exit(1)
    }
}

module.exports = connectDB
