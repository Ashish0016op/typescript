"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let todo = [];
router.get('/', (req, res, next) => {
    res.status(200).json({ todos: todo });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: body.text,
    };
    todo.push(newTodo);
    res.status(200).json({ newtodo: newTodo });
});
router.put('/update/:todoId', (req, res, next) => {
    const params = req.params;
    const todoIndex = todo.findIndex(todoItem => todoItem.id === params.todoId);
    if (todoIndex >= 0) {
        todo[todoIndex] = { id: todo[todoIndex].id, text: req.body.text };
        return res.status(200).json({ todo: todo });
    }
    res.status(404).json({ message: 'todoItem not found' });
});
router.delete('/delete/:todoId', (req, res, next) => {
    const params = req.params;
    todo = todo.filter((todoItem) => todoItem.id !== params.todoId);
    res.status(200).json({ message: 'todo deleted', todo: todo });
});
exports.default = router;
