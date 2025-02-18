const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");
require("dotenv").config();
const app = express();

const { PORT = 3001 } = process.env;
const mainRouter = require('./routes/index');
const supertest = require("supertest");
const request = supertest(app)
const DEFAULT_ERROR =require("./utils/erros");
const { errors } = require("celebrate");
const { requestLogger,errorLogger } = require("./middlewares/logger");
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
app.use(errors());
app.use(requestLogger)
app.use(errorLogger)
app.use('/',mainRouter);
module.exports = app