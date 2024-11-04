const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const restaurantSchema = new Schema({
    name: { type: String, required: true, unique: true },
    cuisine: { type: String, required: true },
    averageRating: { type: Number, min: 0, max: 5 },
    averageCost: { type: Number, required: true },
    media: { type: String, required: true },
    description: { type: String, required: true },
    amenities: { type: [Number], required: true },

    reviews: [{ type: Schema.Types.ObjectId, ref: 'Review', default: [] }],
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

// Hash password before saving
restaurantSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
    next()
})

// Method to compare passwords
restaurantSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('Restaurant', restaurantSchema)
