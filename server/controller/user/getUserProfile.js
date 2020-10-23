const Joi = require("joi");
const User = require("../../model/User");

const validate = (data) => {
  const schema = Joi.object({
    userToFind: Joi.number().integer().required(),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    const signedInUser = req.session.user.userId;
    const { userToFind } = req.body;
    let result = await User.getUserProfile(req.con, signedInUser, userToFind);
    return res.status(200).send({ userProfile: result[0] });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
