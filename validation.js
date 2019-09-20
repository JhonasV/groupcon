//VALIDATION
const Joi = require("joi");

exports.validateRegister = data => {
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
    url: Joi.string().required(),
    user: Joi.string().required()
  };

  return Joi.validate(data, schema);
};
