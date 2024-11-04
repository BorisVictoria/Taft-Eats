const express = require('express')
const reviewController = require('../controllers/reviewController.js')
const authMiddleware = require('../middleware/auth.js')

const router = express.Router()

router.post('/', authMiddleware, reviewController.createReview) // Protected route to create a review
router.get('/:id', reviewController.getReview) // Public route to view a specific review
router.put('/:id', authMiddleware, reviewController.updateReview) // Protected route to update a review
router.delete('/:id', authMiddleware, reviewController.deleteReview) // Protected route to delete a review

module.exports = router
