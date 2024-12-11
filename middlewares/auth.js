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

  const token = authorization.replace('Bearer ', "");

  try {
   const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload
  } catch (err) {
    return res
    .status(AUTHORIZATION_ERROR.status)
    .send({ message: AUTHORIZATION_ERROR.message });
  }

  return next(); // sending the request to the next middleware
};
module.exports = auth