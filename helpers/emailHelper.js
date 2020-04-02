const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahmandi.testmail@gmail.com',
    pass: process.env.EMAIL_PASS
  }
})

module.exports = transporter