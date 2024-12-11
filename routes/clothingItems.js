const router = require('express').Router();
const {createItem,getItem,deleteItem,updateLike,deleteLike}= require("../controllers/clothingItems");
const auth = require("../middlewares/auth");

// Router paths
router.post("/", createItem,auth);
router.get("/", getItem,auth);
router.delete("/:itemId", deleteItem,auth);
router.delete("/:itemId/likes",deleteLike,auth);
router.put("/:itemId/likes",updateLike,auth);
module.exports = router;