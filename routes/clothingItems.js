const router = require('express').Router();
const {createItem,getItem,deleteItem,updateLike,deleteLike}= require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// Router paths
router.post("/", auth,createItem);
router.get("/", auth,getItem);
router.delete("/:itemId",auth, deleteItem);
router.delete("/:itemId/likes",auth,deleteLike);
router.put("/:itemId/likes",auth, updateLike);
module.exports = router;