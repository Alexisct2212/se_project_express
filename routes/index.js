const router = require("express").Router();
const userRouter = require('./users');
const clothingRouter = require("./clothingItems");

router.use("/users", userRouter);
router.use("/items",clothingRouter );
router.use((req, res) => {
  res.status(400).send({ message: "Router not found" });
});

module.exports =router;