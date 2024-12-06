const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

const app = express();

const { PORT = 3001 } = process.env;

const mainRouter = require('./routes/index');

// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db').then(()=>{
  console.log("connected to DB")
}).catch(console.error);

// functions
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
});
app.use(cors());
app.use(express.json());
app.use('/',mainRouter);
module.exports = app