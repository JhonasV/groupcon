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
