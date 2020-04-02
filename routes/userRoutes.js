const express = require('express')
const route = express.Router()
const UserController = require('../controllers/userController')

route.post('/signup', UserController.signup)
route.post('/login', UserController.login)
route.post('/reqResetPassword', UserController.reqResetPassword)
route.post('/resetPassword', UserController.resetPassword)

module.exports = route