module.exports = (err, req, res, next) => {
  let status = 500
  let errObj = {
    msg: 'internal server error'
  }

  // error validation
  if (err.name === 'SequelizeValidationError')
  {
    status = 400
    errObj = {
      msg: 'bad request',
      errors: []
    }
    err.errors.forEach(error => {
      errObj.errors.push(error.message)
    });
  }

  // error unique constraint
  if (err.name === 'SequelizeUniqueConstraintError')
  {
    status = 400
    errObj = {
      msg: "Email already exists"
    }
  }

  // invalid input signin
  if (err.name === 'invalidInputSignIn')
  {
    status = 400
    errObj = {
      msg: 'Invalid email or password'
    }
  }

  // user not found
  if (err.name === 'userNotFound')
  {
    status = 404
    errObj = {
      msg: 'User Not Found'
    }
  }

  // send OTP error
  if (err.name === 'sendOtpError')
  {
    status = 400
    errObj = {
      msg: 'Failed send OTP Code to email'
    }
  }

  // invalid OTP Code
  if (err.name === 'invalidOtpCode') {
    status = 400
    errObj = {
      msg: 'Invalid OTP Code',
      verified: err.verified
    }
  }

  // unauthorized user
  if (err.name === 'unauthorized') {
    status = 400
    errObj = {
      msg: 'Unauthorized user'
    }
  }

  res.status(status).json(errObj)
}