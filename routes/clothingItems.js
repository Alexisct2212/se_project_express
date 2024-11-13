const router = require('express').Router();
const {createItem,getItem,deleteItem, updateItem}= require("../controllers/clothingItems");
//Router paths
router.post("/", createItem);
router.get("/", getItem);
router.put("/:itemId", updateItem);
router.delete("/:itemId", deleteItem);
module.exports = router;