const User = require("../models/user");
const { BAD_REQUEST_STATUS_CODE, DEFAULT_ERROR } = require("../utils/erros");
//
const getUsers = (req, res) => {
   User
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR.message });
    });
};
const createUser = (req, res) => {
  const { name, avatar } = req.body;
   User
    .create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidatorError") {
        res.status(BAD_REQUEST_STATUS_CODE).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};

const getUser = (req, res) => {
  const { _id } = req.params;
  User
    .findById(_id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return res.status(BAD_REQUEST_STATUS_CODE).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST_STATUS_CODE).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      return res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR.message });
    });
};
module.exports = { getUser, getUsers, createUser };
