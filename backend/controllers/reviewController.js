const reviewService = require('../services/reviewService.js')

const createReview = async (req, res, next) => {
    try {
        const review = await reviewService.createReview(req.body)
        res.status(201).json(review)
    } catch (error) {
        next(error)
    }
}

const getReview = async (req, res, next) => {
    try {
        const review = await reviewService.getReviewById(req.params.id)
        res.json(review)
    } catch (error) {
        next(error)
    }
}

const updateReview = async (req, res, next) => {
    try {
        const review = await reviewService.updateReview(req.params.id, req.body)
        res.json(review)
    } catch (error) {
        next(error)
    }
}

const deleteReview = async (req, res, next) => {
    try {
        await reviewService.deleteReview(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createReview,
    getReview,
    updateReview,
    deleteReview
}
