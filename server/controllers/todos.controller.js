const Todos = require('../models/Todos');

//*@ DESC    All todo items
//*@ ROUTE   GET /api/v1/todos
//*@ ACCESS  Public
const getAllTodos = async (req, res) => {
    const { completed } = req.query;
    let filterObj = {};

    if (completed) {
        filterObj.completed = true;
    }

    try {
        const todoList = await Todos.find(filterObj).sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: todoList.length,
            todoList,
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

//*@ DESC    Single todo item
//*@ ROUTE   GET /api/v1/todos/:id
//*@ ACCESS  Public
const getSingleTodo = async (req, res) => {
    const todoID = req.params.id;

    try {
        const todoItem = await Todos.findOne({ _id: todoID });
        res.status(200).json({ success: true, todoItem });
    } catch (err) {
        res.status(500).json({ success: true, err });
    }
};

//*@ DESC    Single todo item
//*@ ROUTE   POST /api/v1/todos
//*@ ACCESS  Public
const createTodo = async (req, res) => {
    const { title, desc } = req.body;

    try {
        const result = await Todos.create({ title, desc });
        res.status(201).json({
            success: true,
            msg: 'Created Successfully!',
            result,
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

//*@ DESC    Update Single todo item
//*@ ROUTE   PATCH /api/v1/todos/:id
//*@ ACCESS  Public
const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { title, desc, completed } = req.body;

    try {
        const todoItem = await Todos.findOne({ _id: id });

        const {
            title: todoTitle,
            desc: todoDesc,
            completed: todoCompleted,
        } = todoItem;

        let update = {};

        if (
            title !== todoTitle &&
            desc !== todoDesc &&
            completed !== todoCompleted
        ) {
            update = { title: title, desc: desc, completed: completed };
        } else if (title !== todoTitle && desc !== todoDesc) {
            update = { title: title, desc: desc };
        } else if (title !== todoTitle && completed !== todoCompleted) {
            update = { title: title, completed: completed };
        } else if (desc !== todoDesc && completed !== todoCompleted) {
            update = { desc: desc, completed: completed };
        } else if (title !== todoTitle) {
            update = { title: title };
        } else if (desc !== todoDesc) {
            update = { desc: desc };
        } else if (completed !== todoCompleted) {
            update = { completed: completed };
        } else {
            res.json({
                success: false,
                msg: 'Nothing to update, values submitted are the same!',
            });
            return;
        }

        const result = await Todos.updateOne({ _id: id }, update);

        res.status(200).json({
            success: true,
            msg: 'Updated Successfully!',
            result,
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

//* @DESC    Delete Single todo item
//* @ROUTE   DELETE /api/v1/todos/:id
//* @ACCESS  Public
const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Todos.deleteOne({ _id: id });
        res.status(200).json({
            success: true,
            msg: 'Deleted Successfully!',
            result,
        });
    } catch (err) {
        res.status(500).json({ success: false, err });
    }
};

module.exports = {
    getAllTodos,
    getSingleTodo,
    createTodo,
    updateTodo,
    deleteTodo,
};
