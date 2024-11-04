const jwt = require('jsonwebtoken')
const userService = require('../services/userService')

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' })

    if (userService.isTokenBlacklisted(token)) {
        return res.status(401).json({ message: 'Token is invalidated' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: 'Token is not valid' })
    }
}

module.exports = authMiddleware
