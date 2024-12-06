const router = require('express').Router();
const {createItem,getItem,deleteItem,updateLike,deleteLike}= require("../controllers/clothingItems");

// Router paths
router.post("/", createItem);
router.get("/", getItem);
router.delete("/:itemId", deleteItem);
router.delete("/:itemId/likes",deleteLike);
router.put("/:itemId/likes",updateLike);
module.exports = router;