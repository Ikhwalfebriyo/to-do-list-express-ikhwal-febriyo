const Todo = require("../models/todo")

module.exports = {
    getAllTodo: async (req, res) => {
        const user = req.user

        const todos = await Todo.find({userID: user.id}).populate("userID", ["_id", "name"])

        res.json({
            message: "Berhasil mendapatkan data todo",
            data: todos
        })
    },

    getTodoById: async (req, res) => {
        const id = req.params.id

        try{
            const todos = await Todo.findById(id).populate("userID", ["_id", "name"])
            res.json({
                message: "Berhasil mendapatkan todo by id",
                data: todos
            })
        } catch(error){
            res.json({
                message: "Data tidak ditemukan"
            })
        }
    },

    createTodo: async (req, res) => {
        let data = req.body

        await Todo.create(data)

        res.json({
            message: "Berhasil membuat data todo"
        })
    },

    deleteTodoByID: async (req, res) => {
        const id = req.params.id

        try{
            const todos = await Todo.findByIdAndDelete(id).populate("userID", ["_id", "name"]);;
            res.json({
                message: "berhasil menghapus data by id",
                data: todos
            })
        } catch(error){
            res.json({
                message: "Data gagal dihapus"
            })
        }
    },

    deleteAllTodo: async (req, res) => {
        const id = req.params.id

        try{
            const todos = await Todo.deleteMany(id).populate("userID", ["_id", "name"]);
            res.json({
                message: "berhasil menghapus semua data todo",
                data: todos
            })
        } catch(error){
            res.json({
                message: "Data gagal dihapus"
            })
        }
    },

    updateTodoById: async (req, res) => {
        try{
            const id = req.params.id
            const update = req.body
            const option = {new : true}
            const todos = await Todo.findByIdAndUpdate(id, update, option).populate("userID", ["_id", "name"]);
            res.json({
                message: "berhasil update data",
                data: todos
            })
        } catch(error){
            res.json({
                message: "Data gagal di update"
            })
        }
    }
}