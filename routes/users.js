const router = require('express').Router();
const {getUsers,getUser,createUser} = require("../controllers/users")

router.get('/', getUsers);
router.get("/:userId", getUser);
router.post("/", createUser);
router.patch("/:userId/me", getUser)
module.exports = router;