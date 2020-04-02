const bcrypt = require('bcryptjs')
const salt = Number(process.env.SALT)

function hashPassword (password) {
  return bcrypt.hashSync(password, salt)
}

function comparePassword (inputPassword, hashedPassword) {
  return bcrypt.compareSync(inputPassword, hashedPassword)
}

module.exports = { hashPassword, comparePassword }