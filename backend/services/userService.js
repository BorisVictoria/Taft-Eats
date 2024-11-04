const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenBlacklist = []

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10)
    const user = new User({ ...data, password: hashedPassword })
    return await user.save()
}

const getUserById = async (id) => {
    return await User.findById(id).select('-password').populate('reviews')
}

const updateUser = async (id, data) => {
    // update the password only when correct and needed
    if (data.newPassword) {
        const isPassCorrect = await authenticateUser(data.oldUsername, data.password)

        if (isPassCorrect) {
            data.password = await bcrypt.hash(data.newPassword, 10)
        } else {
            delete data.password
        }
    } else {
        delete data.password
    }

    return await User.findByIdAndUpdate(id, data, { new: true }).select('-password')
}

const deleteUser = async (id) => {
    return await User.findByIdAndDelete(id)
}

const generateToken = (user) => {
    return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const authenticateUser = async (username, password) => {
    const user = await User.findOne({ username })

    if (!user) {
        return null
    }

    const isMatch = await user.comparePassword(password)

    if (!isMatch) {
        return null
    }

    return user
}

const logoutUser = (token) => {
    tokenBlacklist.push(token)
}

const isTokenBlacklisted = (token) => {
    return tokenBlacklist.includes(token)
}

const checkUsername = async (username) => {
    return await User.findOne({ username })
}

module.exports = {
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    generateToken,
    authenticateUser,
    logoutUser,
    isTokenBlacklisted,
    checkUsername
}
