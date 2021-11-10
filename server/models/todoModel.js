const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    completed: { type: Boolean, default: false },

    createdBy: {
      type: mongoose.Types.ObjectId,
      required: [true, 'User is required'],
      ref: 'User',
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Todos', TodoSchema);
