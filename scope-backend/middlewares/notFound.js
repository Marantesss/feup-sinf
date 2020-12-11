const notFound = (req, res) => {
  return res.json({ status: 404 });
};

module.exports = notFound;
