require("dotenv").config()
const jwt = require("jsonwebtoken")
const Todo = require("../models/todo")
const User = require("../models/user")

module.exports = {
    getAllUser: async (req, res) => {
        const users = await User.find()

        res.json({
            message: "Berhasil mendapatkan data user",
            data: users
        })
    },

    getUserById: async (req, res) => {
        const id = req.params.id

        try {
            const user = await User.findById(id)
            res.json({
                message: "Berhasil mendapatkan data user by id",
                data: user
            })
        } catch (error){
            res.json ({
                message: "Data tidak ditemukan"
            })
        }
    },

    getUsertodos: async (req, res) => {
        const {id} = req.params

        const todos = await Todo.find({userID: id}).populate("userID", ["_id", "name"])

        res.json(todos)
    },

    regis: async (req, res) => {
        let data = req.body

        await User.create(data)

        res.json({
            message: "Berhasil membuat data user"
        })
    },

    login: async (req, res) => {
        const userLogin = req.body

        try{
            const user = await User.findOne({email: userLogin.email})
            if (!user) throw new Error("Invalid user")

            if (user.password !== userLogin.password) throw new Error("Invalid user")

            const token = jwt.sign({id: user._id, email: user.email}, process.env.JWT_KEY)

            res.json({
                message: "login successfull",
                userId: user._id,
                token,
            })
        } catch (error) {
            res.json(error.message)
        }
    },
}