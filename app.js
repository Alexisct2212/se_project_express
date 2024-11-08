const express = require("express");
const mongoose = require("mongoose")
const app = express();
const { PORT = 3001 } = process.env;
const mainRouter = require('./routes/index')
//DB connection
mongoose.connect('mongodb://localhost:27017/wtwr_db').then(()=>{
  console.log("connected to DB")
}).catch(console.error);

//functions
app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}`)
})

app.use('/',mainRouter);
