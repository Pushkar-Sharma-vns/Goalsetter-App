const jwt = require('jsonwebtoken')
const asynchandler = require('express-async-handler')
const User = require('../models/userModel')


const protect = asynchandler(async (req, res, next) => {
    let token

    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // Verify token
            decoded = jwt.verify(token, process.env.SECRET_JWT)

            // Get user from token
            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }