const express = require('express');
const dotenv = require('dotenv');
require('express-async-errors');
const cors = require('cors');
const connectDb = require('./configs/db');

const { StatusCodes } = require('http-status-codes');
const errorHandler = require('./middleware/errorHandlerMiddleware');
const authorizeUser = require('./middleware/authMiddleware');

//* Routes imports
const userRoutes = require('./routes/userRoutes');
const todoRoutes = require('./routes/todoRoutes');

//* colors for console log
const colors = require('colors');

const app = express();

dotenv.config();

//*MIDDLEWARE
app.use(express.json());
app.use(cors());

//* ROUTES
app.use('/api/users', userRoutes);
app.use('/api/todo', authorizeUser, todoRoutes);

//* ERROR HANDLING MIDDLEWARE
app.use('*', (req, res) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .json({ success: false, msg: 'URL path not found' });
});

app.use(errorHandler);

const port = process.env.PORT || 3000;

// * CONNECTING TO DB USING mongoose
connectDb()
  .then(() => {
    // * STARTING A SERVER
    console.log('DB connected successfully!'.underline.bold.yellow);
    app.listen(port, (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log(
        `Server running in ${process.env.NODE_ENV} on port ${port}`.underline
          .bold.cyan
      );
    });
  })
  .catch((err) => {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err });
  });
