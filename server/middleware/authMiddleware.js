const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../utils/customError');

const authorizeUser = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
  }

  if (!req.headers.authorization.startsWith('Bearer ')) {
    throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    throw new CustomError('Unauthorized', StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authorizeUser;
