const router = require("express").Router();
const userRouter = require('./users');
const clothingRouter = require("./clothingItems");
const { REQUEST_NOT_FOUND } = require("../utils/erros");
const {login,createUser} = require("../controllers/users");



router.use("/users", userRouter,);
router.use("/items",clothingRouter );
router.post("/signin", login);
router.post("/signup", createUser);


router.use((req, res) => {
  res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
});

module.exports =router;