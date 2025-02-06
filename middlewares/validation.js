const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const validateClothing = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    imageUrl: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.uri": 'the "imageUrl" field must be a valid url',
    }),
    weather:Joi.string().required()
    }),
  })

const createUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    avatar: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "avatar" field must be filled in',
      "string.uri": 'the "avatar" field must be a valid url',
    }),
    email:Joi.string().required().email().message({

    }),
    password:Joi.string().required().min(2).max(30).message({

    }),
  }),
});
const validateUserLogin = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),

    password: Joi.string().required().min(2).messages({
      "string.empty": 'The "imageUrl" field must be filled in',
      "string.password": 'the "password" field must be a correct',
    }),
  }),
});
const UserClothing = celebrate({
  // validate parameters
  params: Joi.object().keys({
    itemId: Joi.string().alphanum().length(24),
  }),
  headers: Joi.object().keys({
    // validate headers
  }).unknown(true),
  query: Joi.object().keys({
    // validate query
  }),
});

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error('string.uri');
}
module.exports = {UserClothing,validateUserLogin,validateClothing,createUserInfo}