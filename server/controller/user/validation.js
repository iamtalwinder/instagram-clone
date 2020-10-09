const Joi = require("joi");

module.exports = {
  signup: (data) => {
    const schema = Joi.object({
      fullName: Joi.string().min(1).max(30).required(),
      userName: Joi.string()
        .pattern(new RegExp("^[a-z0-9_-]{3,15}$"))
        .required(),
      email: Joi.string().max(50).email().required(),
      password: Joi.string().min(6).max(20).required(),
    });
    return schema.validate(data);
  },
};
