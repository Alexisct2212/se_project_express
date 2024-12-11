const router = require('express').Router();
const { getUser, updateUser} = require("../controllers/users");
const auth = require("../middlewares/auth");

router.get("/me", getUser,auth);
router.patch("/me", updateUser,auth)
module.exports = router;