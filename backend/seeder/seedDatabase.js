const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Review = require('../models/review')
const Restaurant = require('../models/restaurant')
const Response = require('../models/response')
const { restaurants, reviews, responses, users } = require('./dummyData')

const hashPasswords = async (entities) => {
    return await Promise.all(
        entities.map(async (entity) => {
            if (entity.password) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash(entity.password, salt)
                return { ...entity, password: hashedPassword }
            }
            return entity
        })
    )
}

const seedDatabase = async () => {
    try {
        
        await User.deleteMany()
        await Restaurant.deleteMany()
        await Review.deleteMany()
        await Response.deleteMany()

        const hashedUsers = await hashPasswords(users)
        const hashedRestaurants = await hashPasswords(restaurants)

        const createdUsers = await User.insertMany(hashedUsers)
        const createdRestaurants = await Restaurant.insertMany(hashedRestaurants)
        const createdReviews = await Review.insertMany(reviews)
        const createdResponses = await Response.insertMany(responses)

        for (let i = 0; i < createdRestaurants.length; i++) {
            const restaurant = createdRestaurants[i]
            const review = createdReviews[i]

            if (review) {
                const restaurantParent = await Restaurant.findByIdAndUpdate(restaurant._id, {
                    $push: { reviews: review._id }
                })
                const user = await User.findOneAndUpdate({ username: review.username }, { $push: { reviews: review._id } })
                await Review.findByIdAndUpdate(review._id, { userId: user._id, restaurantId: restaurantParent._id });
            }
        }

        for (let i = 0; i < createdResponses.length; i++){
            const restaurant = createdRestaurants[i]
            const response = createdResponses[i]

            await Response.findByIdAndUpdate(response._id, {ownerId: restaurant._id})
        }

        if (createdReviews.length > 1 && createdResponses.length > 0) {
            const secondReview = createdReviews[1]
            const responseIds = createdResponses.map((response) => response._id)

            await Review.findByIdAndUpdate(secondReview._id, {
                $push: { replies: { $each: responseIds } }
            })
        }

        console.log('Dummy data inserted successfully!')
        console.log({
            createdUsers,
            createdRestaurants,
            createdReviews,
            createdResponses
        })
    } catch (error) {
        console.error('Error seeding database:', error)
    } finally {
        mongoose.connection.close()
    }
}

module.exports = seedDatabase
