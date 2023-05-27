require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const app = express()

app.get("/", (req, res) => {
  res.send("<h1>Hello World</h1>")
})

app.listen(3001)

// Connect to mongodb database
connectDB()

async function connectDB() {
  console.log("connecting to database ...")
  await mongoose.connect(process.env.MONGODB_URI)
  console.log("connected to database successfully!")
}
