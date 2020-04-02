const express = require('express')
const route = express.Router()
const userRoutes = require('./userRoutes')
const authRoutes = require('./authRoutes')

route.use('/user', userRoutes)
route.use('/auth', authRoutes)

module.exports = route