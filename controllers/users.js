const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {badRequestError,unauthorizedError,notFoundError,internalServerError, conflictError} =require("../utils/centralizedErros")
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");

// Create a new user
const createUser = (req, res,next) => {
  const { password,name,avatar,email } = req.body;
  // Hash the password before saving
  bcrypt
    .hash(password, 10)
    .then((hashedPassword) =>
      User.create({ name, avatar, email, password: hashedPassword }),
    )
    .then((user) => {
      // Successful user creation
      const userData = { name, avatar, email, _id:user._id };
      res.status(201).send(userData);
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Handle duplicate email error
        return next(conflictError("User with this email already exit"));
      }
      if (err.name === "ValidationError") {
        return next(badRequestError('validation failed'));
      }
      return next(internalServerError())
    });
};

const getUser = (req, res,next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError("User Not Found"))
      }
      if (err.name === "CastError") {
        return next(badRequestError("Wrong User ID"))
      }
      return next(internalServerError())
    });
};

const login = (req, res,next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(badRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" });
      res.send({ token });
    })
    .catch((err) => {
      if (err.message.includes("Incorrect email") || err.message.includes("Incorrect password")) {
        return next (unauthorizedError("wrong password or email"))
      }
      return next(internalServerError())
    });
};

const updateUser = (req, res,next) => {
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
        return next(badRequestError("validation Failed"));
      }
      if (err.name === "DocumentNotFoundError") {
        return next(notFoundError("Invalid User"))
      }
      return next(internalServerError())
    });
};

module.exports = { createUser, login, updateUser, getUser };