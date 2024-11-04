const Review = require('../models/review')

const createReview = async (data) => {
    const review = new Review(data)
    return await review.save()
}

const getReviewById = async (id) => {
    return await Review.findById(id).populate('user').populate('restaurant')
}

const updateReview = async (id, data) => {
    return await Review.findByIdAndUpdate(id, data, { new: true })
}

const deleteReview = async (id) => {
    return await Review.findByIdAndDelete(id)
}

module.exports = {
    createReview,
    getReviewById,
    updateReview,
    deleteReview
}
