const express = require('express');
const dotenv = require('dotenv');
const todos = require('./routes/todos');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({ origin: '*' }));

// ROUTES
app.use('/api/v1/todos', todos);

app.use('*', (req, res) => {
    res.status(404).json({ success: false, msg: 'URL path not found' });
});

const port = process.env.PORT || 5000;

// * CONNECTING TO DB USING mongoose
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        // * STARTING A SERVER
        console.log('DB connected successfully!');
        app.listen(port, (err) => {
            if (err) {
                console.log(err);
                return;
            }

            console.log(`Server running on http://localhost:${port}`);
        });
    })
    .catch((err) => {
        res.status(500).json({ msg: err });
    });
