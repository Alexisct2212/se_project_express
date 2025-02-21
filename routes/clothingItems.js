const router = require('express').Router();
const { celebrate, Joi, } = require('celebrate');
const {createItem,getItem,deleteItem,updateLike,deleteLike}= require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
// Router paths
router.post("/", auth,celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().min(2),
    weather: Joi.string().valid('hot', 'warm', 'cold').required(),
  }),
}),createItem);
router.get("/",getItem);
router.delete("/:itemId",auth,celebrate({
  // validate parameters
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).required(),
  }),
}),  deleteItem);

router.delete ("/:itemId/likes",auth ,celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).required(),
  }),}),deleteLike);

router.put("/:itemId/likes",auth,celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24).required(),
  }),
}),updateLike);
module.exports = router;