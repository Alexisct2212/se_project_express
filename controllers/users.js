const user = require("../models/user");
const { BAD_REQUEST_STATUS_CODE, DEFAULT_ERROR } = require("../utils/erros");
//
const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(DEFAULT_ERROR).send({ message: DEFAULT_ERROR.message });
    });
};
const CreateUser = (req, res) => {
  const { name, avatar } = req.body;
  user
    .create({ name, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidatorError") {
        return res.status(BAD_REQUEST_STATUS_CODE).send({ message: BAD_REQUEST_STATUS_CODE.message });
      }
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};
const getUser = (req, res) => {
  const { _id } = req.params;
  user
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
module.exports = { getUser, getUsers, CreateUser };
