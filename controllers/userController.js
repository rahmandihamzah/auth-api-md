const { User } = require('../models')
const { generateToken, verifyToken } = require('../helpers/jwt')
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const emailHelper = require('../helpers/emailHelper')
const generateOtp = require('../helpers/generateOtp')

class AuthController {
  static signup (req, res, next) {
    const {
      fullName,
      email,
      password
    } = req.body

    User.create({
      fullName,
      email,
      password
    })
      .then(response => {
        const payload = {
          user_id: response.id,
          email: response.email
        }

        res.status(201).json({
          msg: 'Sign up completed',
          payload
        })
      })
      .catch(err => {
        next(err)
      })
  }

  static login (req, res, next) {
    const {
      email,
      password
    } = req.body
    let payload
    
    User.findOne({
      where: {
        email
      }
    })
      .then(response => {
        const err = {
          name: 'invalidInputSignIn'
        }

        if (response) {
          const valid = comparePassword(password, response.password)
          if (valid) {
            payload = {
              id: response.id,
              email: response.email
            }
            res.status(200).json({
              msg: 'Signed in',
              access_token: generateToken(payload)
            })
          } else {
            next(err)
          }
        } else {
          next(err)
        }
      })
      .catch(err => {
        next(err)
      })
  }

  static reqResetPassword (req, res, next) {
    const { email } = req.body
    const otpCode = generateOtp()
    const hashedOtpCode = hashPassword(otpCode)
    const payload = {
      email,
      otpCode: hashedOtpCode
    }
    const token = generateToken(payload)
    let err = {
      name: ''
    }

    const mailOption = {
      from: 'rahmandi.testmail@gmail.com',
      to: email,
      subject: 'OTP Code',
      text: `${otpCode} is your OTP Code. Do not share it with anyone`
    }

    emailHelper.sendMail(mailOption, (error, info) => {
      if (error)
      {
        err.name = 'sendOtpError'
        next(err)
      } else
      {
        res.status(200).json({
          msg: 'Send OTP code complete',
          token,
          info
        })
      }
    })
  }

  static resetPassword (req, res, next) {
    const { token } = req.headers
    const { otpCode, email } = verifyToken(token)
    const { inputOtpCode, newPassword } = req.body
    const valid = comparePassword(inputOtpCode, otpCode)
    let err = {
      name: '',
      verified: false
    }

    if (valid) {
      User.update(
        {
          password: newPassword
        },
        {
          where: {
            email
          },
          returning: true
        }
      )
        .then(_ => {
          res.status(200).json({
            msg: 'Reset password complete'
          })
        })
        .catch(err => {
          next(err)
        })
    } else {
      err.name = 'invalidOtpCode'
      next(err)
    }
  }
}

module.exports = AuthController