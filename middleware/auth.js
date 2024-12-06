const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/config");
const { AUTHORIZATION_ERROR } = require('../utils/erros');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(AUTHORIZATION_ERROR.status)
      .send({ message: AUTHORIZATION_ERROR.message });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return res
    .status(AUTHORIZATION_ERROR.status)
    .send({ message: AUTHORIZATION_ERROR.message });
  }

  req.user = payload; // assigning the payload to the request object

  next(); // sending the request to the next middleware
};
module.exports = auth