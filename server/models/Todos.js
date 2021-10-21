const mongoose = require('mongoose');

const TodosSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Todo title is required'],
            trim: true,
        },
        desc: {
            type: String,
            required: [true, 'Todo description is required'],
            trim: true,
        },
        completed: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Todos', TodosSchema);
