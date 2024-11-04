// controllers/restaurantController.js

const restaurantService = require('../services/restaurantService')

const createRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.createRestaurant(req.body)
        res.status(201).json(restaurant)
    } catch (error) {
        next(error)
    }
}

const getRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.getRestaurantById(req.params.id)
        res.json(restaurant)
    } catch (error) {
        next(error)
    }
}

const getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = (await restaurantService.getAllRestaurants()).slice(0, 9)
        res.json(restaurants)
    } catch (error) {
        next(error)
    }
}

const searchRestaurants = async (req, res, next) => {
    try {
        const query = req.query.query
        const restaurants = await restaurantService.searchRestaurants(query)
        const updatedRestaurants = restaurants.map(({ averageRating, averageCost, _id, name }) => ({
            _id: _id,
            name: name,
            rating: averageRating,
            avgPrice: averageCost
        }))
        res.json(updatedRestaurants)
    } catch (error) {
        next(error)
    }
}

const updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await restaurantService.updateRestaurant(req.params.id, req.body)
        res.json(restaurant)
    } catch (error) {
        next(error)
    }
}

const deleteRestaurant = async (req, res, next) => {
    try {
        await restaurantService.deleteRestaurant(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createRestaurant,
    getRestaurant,
    getAllRestaurants,
    searchRestaurants,
    updateRestaurant,
    deleteRestaurant
}
