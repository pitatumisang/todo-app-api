const Todo = require('../models/todoModel');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../utils/customError');

//*@ DESC    Get All todo items
//*@ ROUTE   GET /api/v1/todo
//*@ ACCESS  Public
const getAllTodo = async (req, res) => {
  const { userId } = req.user;
  const { completed } = req.query;
  let filterObj = {};

  filterObj.createdBy = userId;

  if (completed) {
    filterObj.completed = true;
  }

  const todoList = await Todo.find(filterObj).sort({ createdAt: -1 });
  res.status(StatusCodes.OK).json({
    success: true,
    count: todoList.length,
    todoList,
  });
};

//*@ DESC    Get Single todo item
//*@ ROUTE   GET /api/v1/todo/:id
//*@ ACCESS  Public
const getSingleTodo = async (req, res) => {
  const { userId } = req.user;
  const todoId = req.params.id;

  const todoItem = await Todo.findOne({ _id: todoId, createdBy: userId });
  if (!todoItem) {
    throw new CustomError('Todo not found', StatusCodes.NOT_FOUND);
  }
  res.status(StatusCodes.OK).json({ success: true, todoItem });
};

//*@ DESC    Create todo item
//*@ ROUTE   POST /api/v1/todo
//*@ ACCESS  Public
const createTodo = async (req, res) => {
  const { userId } = req.user;
  const { title, desc } = req.body;

  const todo = await Todo.create({ createdBy: userId, title, desc });

  res.status(StatusCodes.CREATED).json({
    success: true,
    msg: 'Created Successfully!',
    todo,
  });
};

//*@ DESC    Update Single todo item
//*@ ROUTE   PATCH /api/v1/todo/:id
//*@ ACCESS  Public
const updateTodo = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const updatedTodo = await Todo.findOneAndUpdate(
    { _id: id, createdBy: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedTodo) {
    throw new CustomError(
      `Todo with id:${id} not found`,
      StatusCodes.NOT_FOUND
    );
  }
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: 'Todo Updated successfully', updatedTodo });
};

//* @DESC    Delete Single todo item
//* @ROUTE   DELETE /api/v1/todo/:id
//* @ACCESS  Public
const deleteTodo = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const result = await Todo.deleteOne({ _id: id, createdBy: userId });

  if (!result) {
    throw new CustomError(
      `Todo with id:${id} not found`,
      StatusCodes.NOT_FOUND
    );
  }
  res.status(StatusCodes.OK).json({
    success: true,
    msg: 'Deleted Successfully!',
    result,
  });
};

module.exports = {
  getAllTodo,
  getSingleTodo,
  createTodo,
  updateTodo,
  deleteTodo,
};
