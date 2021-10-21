const express = require('express');

const router = express.Router();

const {
    getAllTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo,
} = require('../controllers/todos.controller');

router.get('/', getAllTodos);
router.get('/:id', getSingleTodo);
router.post('/', createTodo);
router.patch('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;
