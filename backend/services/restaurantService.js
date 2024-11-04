const Restaurant = require('../models/restaurant')

const createRestaurant = async (data) => {
    const restaurant = new Restaurant(data)
    return await restaurant.save()
}

const getRestaurantById = async (id) => {
    return await Restaurant.findById(id).select('-password -username')
}

const getAllRestaurants = async () => {
    return await Restaurant.find().select('-password -username') // Returns all restaurants
}

const searchRestaurants = async (query) => {
    return await Restaurant.find({
        $or: [{ name: { $regex: query, $options: 'i' } }]
    }).select('-password -username')
}

const updateRestaurant = async (id, data) => {
    return await Restaurant.findByIdAndUpdate(id, data, { new: true })
}

const deleteRestaurant = async (id) => {
    return await Restaurant.findByIdAndDelete(id)
}

module.exports = {
    createRestaurant,
    getRestaurantById,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant,
    deleteRestaurant
}
