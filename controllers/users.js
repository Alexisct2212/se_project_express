const User = require("../models/user");
const { BAD_REQUEST_STATUS_CODE, DEFAULT_ERROR, REQUEST_NOT_FOUND,AUTHORIZATION_ERROR } = require("../utils/erros");
const JWT_SECRET = require("../utils/config")

const getUsers = (req, res) => {
   User.find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};
const createUser = (req, res) => {
  const { name, avatar,email,password } = req.body;
   User.create({ name, avatar, email, password })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });

    });

};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};
const login = (req,res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST_STATUS_CODE.status)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jtw.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      console.error(err);
      if (
        err.message.includes("Incorrect email") ||
        err.message.includes("Incorrect password")
      ) {
        return res
          .status(AUTHORIZATION_ERROR.status)
          .send({ message: AUTHORIZATION_ERROR.message });
      }
      return res
        .status(DEFAULT_ERROR.status)
        .send({ message: "Internal Server Error" });
    });
};
const updateUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail()
    .then(() => res.status(200).send({ name, avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: "Bad Request" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(REQUEST_NOT_FOUND.status).send({ message: "Page Not Found" });
      }

      return res
        .status(DEFAULT_ERROR)
        .send({ message: "An error has occurred on the server" });
    });
};
module.exports ={ getUser, getUsers, createUser,login,updateUser };
