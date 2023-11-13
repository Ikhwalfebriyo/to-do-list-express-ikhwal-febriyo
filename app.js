const express = require("express")
const cors = require("cors")

const db = require("./config/db")
const allRoutes = require("./routes")

const app = express()
const PORT = process.env.PORT || 3000

db.then(() => {
    console.log("Berhasil konek ke mongoDB");
})
.catch(() => {
    console.log("Gagal konek ke mongoDB");
})

app.use(cors())
app.use(express.json())
app.use(allRoutes)

app.listen(PORT, () => {
    console.log("Server running on port : " + PORT)
})