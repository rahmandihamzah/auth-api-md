const express = require('express')
const route = express.Router()
const AuthController = require('../controllers/authController')

route.get('/reqOtpCode', AuthController.reqOtpCode)
route.post('/verifyOtpCode', AuthController.verifyOtpCode)

module.exports = route