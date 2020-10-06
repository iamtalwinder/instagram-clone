const Joi = require("joi");

module.exports = {
  signup: (data) => {
    const schema = Joi.object({
      firstName: Joi.string().min(1).max(20).required(),
      lastName: Joi.string().min(1).max(20).required(),
      email: Joi.string().max(50).required().email(),
      password: Joi.string().min(6).max(20).required(),
      confirmPassword: Joi.ref("password"),
    });
    return schema.validate(data);
  },
};
