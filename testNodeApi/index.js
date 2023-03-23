const express = require("express")
const app = express()

require('dotenv').config();



const postsRouter = require('./routes/posts.router')



app.use(express.urlencoded({extended:false}))
app.use(express.json())



app.use("/booking", postsRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server running....")
})