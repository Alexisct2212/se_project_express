const router = require("express").Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const clothingRouter = require("./clothingItems");
const {login,createUser} = require("../controllers/users");
const { badRequestError } = require("../utils/centrilizedErros");

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
   res (badRequestError());
});

module.exports =router;