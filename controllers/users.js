const user = require("../models/user");
//
const getUsers = (req, res) => {
  user
    .find({})
    .then((users) => res.status(200).res.send(users))
    .catch((err) => {
      console.log(err);
      return res.status(500).send({ message: err.message });
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
        return res.status(400).send({ message: err.message });
      }
      return res.status(500).send({ message: err.message });
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;
  user
    .findById(userId)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      console.error(err);
      if (err.message === "DocumentNotFoundError") {
        return res.status(err404.status).send({ message: "User not found" });
      }
      if (err.name === "CastError") {
        return res.status(err400.status).send({ message: err400.message });
      }
      return res.status(err500.status).send({ message: err500.message });
    });
};
module.exports = { getUser, getUsers, CreateUser };
