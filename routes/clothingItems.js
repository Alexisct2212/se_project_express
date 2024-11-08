const router = require('express').Router();
router.get("/", ()=> console.log("GET items"));
router.post("/:userId", ()=> console.log("POST items"));
router.delete("/", ()=> console.log("DELETE items by _ID"));
module.exports = router;