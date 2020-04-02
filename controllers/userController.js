const { User } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

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
}

module.exports = AuthController