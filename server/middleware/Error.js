const errorHandler = (err, req, res, next) => {
  if (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = errorHandler;
