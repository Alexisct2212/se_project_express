const router = require("express").Router();
const userRouter = require('./users');
const clothingRouter = require("./clothingItems");
const { BAD_REQUEST_STATUS_CODE } = require("../utils/erros");


router.use("/users", userRouter);
router.use("/items",clothingRouter );
router.use((req, res) => {
  res.status(BAD_REQUEST_STATUS_CODE).send({ message: "error not found" });
});

module.exports =router;