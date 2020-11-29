const Joi = require("joi");
const User = require("../../model/User");

const validate = (data) => {
  const schema = Joi.object({
    user: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  const { error } = validate(req.query);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    const { user } = req.query;
    let users = await User.findUsers(req.con, user);

    return res.status(200).send({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
