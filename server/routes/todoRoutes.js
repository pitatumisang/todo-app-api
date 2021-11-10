const express = require('express');

const router = express.Router();

const {
  getAllTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

router.get('/', getAllTodo);
router.get('/:id', getSingleTodo);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
