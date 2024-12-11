const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { BAD_REQUEST_STATUS_CODE, DEFAULT_ERROR, REQUEST_NOT_FOUND, AUTHORIZATION_ERROR } = require("../utils/erros");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

// Create a new user
const createUser = (req, res) => {
  const { password } = req.body;

  // Hash the password before saving
  bcrypt
    .hash(password, 10)
    .then((user) => {
      // Exclude the password from the response
      const userData = { name: user.name, avatar: user.avatar, email: user.email, _id: user._id };
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Handle duplicate email error
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message:BAD_REQUEST_STATUS_CODE.message});
      }
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const getUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message.includes("Incorrect email") || err.message.includes("Incorrect password")) {
        return res.status(AUTHORIZATION_ERROR.status).send({ message: AUTHORIZATION_ERROR.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const updateUser = (req, res) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.status(200).send({ name: user.name, avatar: user.avatar }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS_CODE.status).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(REQUEST_NOT_FOUND.status).send({ message: REQUEST_NOT_FOUND.message });
      }
      return res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

module.exports = { createUser, login, updateUser, getUser };