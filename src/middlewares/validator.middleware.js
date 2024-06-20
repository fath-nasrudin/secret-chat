const { body, validationResult } = require('express-validator');
const User = require('../models/user.model');

const validateString = (field, options) => {
  return body(field)
    .trim()
    .escape()
    .isLength( { min: 1, max: 30})
    .withMessage(`${field} should at least have 1 chars`);
}

const validateUsername = (field = 'username', options = {}) => {
  return body(field)
    .trim()
    .escape()
    .isLength( { min: 3, max: 30})
    .withMessage('Username should be between 3 until 30 chars')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username only alphabet, number, and _ (underscore')
    .custom(async username => {
      const user = await User.findOne({ username })
      if (user) {
        throw new Error('Username already taken')
      }
      return true;
    })
};

const validatePassword = (field = 'password', options = {}) => {
  return body(field, 'Password should atleast 8 character and have 1 uppercase, 1 lowercase, 1 number, and 1 symbol')
    .trim()
    // .escape()
    .isLength( { min: 8, max: 100}).bail()
    .matches(/[a-z]/).bail()
    .matches(/[A-Z]/).bail()
    .matches(/\d/).bail()
    .matches(/[!@#$%^&*(),.?":{}|<>]/).bail();
}

module.exports = {
  validationResult,
  validateUsername,
  validatePassword,
  validateString,
}