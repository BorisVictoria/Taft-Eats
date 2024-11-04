// routes/restaurantRoutes.js

const express = require('express')
const router = express.Router()
const restaurantController = require('../controllers/restaurantController')
const authMiddleware = require('../middleware/auth.js')

router.post('/', restaurantController.createRestaurant)

router.get('/search', restaurantController.searchRestaurants)
router.get('/:id', restaurantController.getRestaurant)
router.get('/', restaurantController.getAllRestaurants) // Add the route for getting all restaurants

router.put('/:id', restaurantController.updateRestaurant)
router.delete('/:id', restaurantController.deleteRestaurant)

module.exports = router
