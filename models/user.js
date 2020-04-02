'use strict';

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends sequelize.Sequelize.Model {
    static associate (models) {

    }
  }

  User.init({
    fullName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {
          args: true,
          msg: 'Email sould not be empty'
        },
        isEmail: {
          args: true,
          msg : 'Incorrect email format'
        },

      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password sould not be empty'
        },
        len: {
          args: [6],
          msg: 'Minimum password length: 6'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: function (user, options) {
        user.password = hashPassword(user.password)
      }
    }
  })
  
  return User;
};