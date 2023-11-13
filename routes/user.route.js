const express = require("express")
const { getAllUser, getUserById, getUsertodos, login, regis } = require("../controller/user.controller")
const verifyToken = require("../middleware/auth")
const route = express.Router()

route.get("/", getAllUser)
route.get("/:id", getUserById)
route.get("/:id/todos", verifyToken, getUsertodos)
route.post("/login", login)
route.post("/regis", regis)


module.exports = route