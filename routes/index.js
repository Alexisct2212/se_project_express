const router = require("express").Router();
const userRouter = require('./users');
const clothingRouter = require("./clothingItems");
const { REQUEST_NOT_FOUND } = require("../utils/erros");
const {login,createUser} = require("../controllers/users");
const { celebrate, Joi } = require('celebrate');

router.use("/users", userRouter,);
router.use("/items",clothingRouter );
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


router.use((req, res) => {
  res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
});

module.exports =router;