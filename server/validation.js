//VALIDATION
const Joi = require("joi");

exports.validateRegister = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .required(),
    nickname: Joi.string()
      .min(4)
      .required()
  };

  return Joi.validate(data, schema);
};

exports.validateLogin = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(4)
      .required()
  };

  return Joi.validate(data, schema);
};

exports.validateGroups = data => {
  const schema = {
    name: Joi.string().required(),
    url: Joi.string().required()
  };

  return Joi.validate(data, schema);
};

exports.validateEmail = data => {
  const schema = {
    email: Joi.string()
      .email()
      .required()
  };

  return Joi.validate(data, schema);
};

exports.validatePassword = data => {
  const schema = {
    password: Joi.string()
      .required()
      .min(4)
  };

  return Joi.validate(data, schema);
};
