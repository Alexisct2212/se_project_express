const router = require('express').Router();
const {getUsers,getUser,CreateUser} = require("../controllers/users")

router.get("/", getUsers);
router.get("/:userId", getUser);
router.post("/", CreateUser);
module.exports = router;