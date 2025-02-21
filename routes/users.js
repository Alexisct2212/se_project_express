const router = require('express').Router();
const { celebrate, Joi, } = require('celebrate')
const { getUser, updateUser} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", auth,getUser);
router.patch("/me",auth,celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    avatar:Joi.string().required(),
  }),}), updateUser)
module.exports = router;