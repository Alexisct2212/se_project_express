const router = require('express').Router();
const {createItem,getItem,deleteItem,updateLike,deleteLike}= require("../controllers/clothingItems");
const auth = require("../middlewares/auth");
const { celebrate, Joi, } = require('celebrate')
// Router paths
router.post("/", auth,celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    imageUrl: Joi.string().required().min(2),
    weather:Joi.string().required(),
  }),
}),createItem);
router.get("/",getItem);
router.delete("/:itemId",auth,celebrate({
  // validate parameters
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
  query: Joi.object().keys({
    // validate query
  }),
}),  deleteItem);
router.delete("/:itemId/likes",auth,deleteLike);
router.put("/:itemId/likes",auth, updateLike);
module.exports = router;