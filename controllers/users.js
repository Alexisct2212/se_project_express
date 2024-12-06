const User = require("../models/user");
const { BAD_REQUEST_STATUS_CODE, DEFAULT_ERROR, REQUEST_NOT_FOUND } = require("../utils/erros");

const getUsers = (req, res) => {
   User
    .find({})
    .then((users) => res.status(200).send(users))
    .catch((err) => {
      console.log(err);
      res.status(DEFAULT_ERROR.status).send({ message: DEFAULT_ERROR.message });
    });
};
const createUser = (req, res) => {
  const { name, avatar,email,password } = req.body;
   User
    .create({ name, avatar, email, password })
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
  User
    .findById(userId)
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
const login = (req,res)=>{
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }

      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        // the hashes didn't match, rejecting the promise
        return Promise.reject(new Error('Incorrect email or password'));
      }

      // authentication successful
      res.send({ message: 'Everything good!' });
    })
    .catch((err) => {
      res
        .status(401)
        .send({ message: err.message });
    });

};
module.exports = { getUser, getUsers, createUser,login };
