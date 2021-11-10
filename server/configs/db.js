const mongoose = require('mongoose');

const connectDb = async () => {
  return await mongoose.connect(process.env.MONGO_URI);
};

module.exports = connectDb;
