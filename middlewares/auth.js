const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../utils/config");
const {unauthorizedError} =require("../utils/centralizedErros")


const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
     return next(unauthorizedError("access Unauthorized"));
  }

  const token = authorization.replace('Bearer ', "");

  try {
   const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload
  } catch (err) {
    return next(unauthorizedError("access Unauthorized"));
  }

  return next(); // sending the request to the next middleware
};
module.exports = auth