const error = (err, req, res, next) => {
  console.log(err.stack);
  return res.json({ status: 500 });
};

module.exports = error;
