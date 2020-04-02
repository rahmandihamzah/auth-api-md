const { User } = require('../models')
const emailHelper = require('../helpers/emailHelper')
const { verifyToken } = require('../helpers/jwt')
const generateOtp = require('../helpers/generateOtp')

class AuthController {
  static reqOtpCode (req, res, next) {
    const { access_token } = req.headers
    const { email, id } = verifyToken(access_token)
    const otpCode = generateOtp()
    console.log(otpCode, typeof otpCode)

    User.findOne({
      where: {
        email
      }
    })
      .then(response => {
        let err = {
          name: ''
        }

        if (response) {
          const mailOption = {
            from: 'rahmandi.testmail@gmail.com',
            to: email,
            subject: 'OTP Code',
            text: `${otpCode} is your OTP Code. Do not share it with anyone`
          }

          emailHelper.sendMail(mailOption, (error, info) => {
            if (error) {
              err.name = 'sendOtpError'
              next(err)
            } else {
              res.status(200).json({
                msg: 'Send OTP code complete',
                userId: id,
                otpCode,
                info
              })
            }
          })
        } else {
          err.name = 'userNotFound'
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static verifyOtpCode (req, res, next) {
    const { access_token } = req.headers
    const { id } = verifyToken(access_token)
    const { userId, otpCodeFromServer, otpCodeFromUser } = req.body
    let verified
    let err = {
      name: '',
      verified: false
    }

    if (userId == id) {
      if (otpCodeFromServer == otpCodeFromUser) {
        verified = true
        res.status(200).json({
          msg: 'OTP Code Verified',
          verified
        })
      } else {
        err.name = 'invalidOtpCode'
        next(err)
      }
    } else {
      err.name = 'unauthorized'
      next(err)
    }
  }
}

module.exports = AuthController