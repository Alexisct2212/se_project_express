const router = require('express').Router()

router.get("/", ()=> console.log("GET "));
router.get("/:userId", ()=> console.log("GET user by ID"));
router.post("/", ()=> console.log("POST users"));
module.exports = router;