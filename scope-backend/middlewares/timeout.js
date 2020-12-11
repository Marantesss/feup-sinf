const config = require('../config.js').express;

const timeout = (req, res, next) => {
  res.setTimeout(config.timeout, () => {
    const err = new Error('Gateway timeout');
    err.status = 504;
    next(err);
  });

  next();
};

module.exports = timeout;
