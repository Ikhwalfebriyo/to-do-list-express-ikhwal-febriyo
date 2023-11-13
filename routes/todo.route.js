const express = require("express")
const { getAllTodo, getTodoById, createTodo, deleteTodoByID, deleteAllTodo, updateTodoById } = require("../controller/todo.controller")
const verifyToken = require("../middleware/auth")
const route = express.Router()

route.get("/", verifyToken, getAllTodo)
route.get("/:id", getTodoById)
route.post("/createTodo", createTodo)
route.delete("/:id", deleteTodoByID)
route.delete("/", deleteAllTodo)
route.put("/:id", updateTodoById)

module.exports = route