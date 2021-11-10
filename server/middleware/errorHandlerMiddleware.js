const { StatusCodes } = require('http-status-codes');

const errorHandler = (err, req, res, next) => {
  let message = err.message || 'Something went wrong, try again';
  let statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (err.code === 11000) {
    message = 'Email already exists';
    statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.name === 'CastError') {
    message = `Todo with id: ${err.value} not found`;
    statusCode = StatusCodes.NOT_FOUND;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((value) => value.message)
      .toString();
    statusCode = StatusCodes.BAD_REQUEST;
  }

  return res.status(statusCode).json({ success: false, msg: message });
};

module.exports = errorHandler;
