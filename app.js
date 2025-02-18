const express = require("express");
const router = require("express").Router();
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
const {celebrate,Joi}= require('celebrate');
const {login,createUser} = require("./controllers/users");
// DB connection
mongoose.connect('mongodb://127.0.0.1:27017/wtwr_db').then(()=>{
  console.log("connected to DB")
}).catch(console.error);

// functions
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will crash now');
  }, 0);
});
router.post("/signin",celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    email:Joi.string().required().email(),

  }),}), login);

router.post("/signup",celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(2),
    email:Joi.string().required().email(),
    name:Joi.string().required().min(2).max(30),
    avatar:Joi.string().uri(),
  }),}), createUser);

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