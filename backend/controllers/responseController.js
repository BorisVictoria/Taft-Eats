const responseService = require('../services/responseService.js')

const createResponse = async (req, res, next) => {
    try {
        const response = await responseService.createResponse(req.body)
        res.status(201).json(response)
    } catch (error) {
        next(error)
    }
}

const getResponse = async (req, res, next) => {
    try {
        const response = await responseService.getResponseById(req.params.id)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const updateResponse = async (req, res, next) => {
    try {
        const response = await responseService.updateResponse(req.params.id, req.body)
        res.json(response)
    } catch (error) {
        next(error)
    }
}

const deleteResponse = async (req, res, next) => {
    try {
        await responseService.deleteResponse(req.params.id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createResponse,
    getResponse,
    updateResponse,
    deleteResponse
}
