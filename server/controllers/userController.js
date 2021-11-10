const User = require('../models/userModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../utils/customError');

const registerUser = async (req, res) => {
  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'User created successfully',
    user: { userId: user._id, name: user.name, email: user.email },
  });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (email === '' || password === '') {
    throw new CustomError('Email and Password required');
  }

  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    return res.status(StatusCodes.OK).json({
      success: true,
      msg: 'Log in successful',
      token: await user.generateJwtToken(),
    });
  }
  throw new CustomError('Email or Password incorrect');
};

module.exports = { registerUser, loginUser };
