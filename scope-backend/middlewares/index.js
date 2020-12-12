const notFound = require('./notFound.js');
const timeout = require('./timeout.js');
const error = require('./error.js');
const authenticate = require('./authenticate');
const validate = require('./validate');
const validateAccount = require('./validateAccount');

module.exports = {
  notFound,
  timeout,
  error,
  authenticate,
  validate,
  validateAccount
};
