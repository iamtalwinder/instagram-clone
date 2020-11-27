const Joi = require("joi");
const User = require("../../model/User");

const validate = (data) => {
  const schema = Joi.object({
    fullname: Joi.string().min(1).max(30).required(),
    username: Joi.string().alphanum().min(3).max(15).required(),
    website: Joi.string().allow(null).max(30).uri().required(),
    bio: Joi.string().allow(null).max(100).required(),
    email: Joi.string().max(50).email().required(),
    phoneNumber: Joi.string()
      .allow(null)
      .length(10)
      .pattern(/^[0-9]+$/)
      .required()
      .messages({
        "string.length": "Phone Number must be 10 character long",
        "string.pattern.base": "Phone Number can only contain numbers",
      }),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  const { error } = validate(req.body);

  if (error) {
    return res.status(406).send({
      msg: error.details[0].message,
    });
  }

  try {
    const userId = req.session.user.userId;
    const { fullname, username, website, bio, email, phoneNumber } = req.body;

    let result = await User.findOtherUserWithSameField(
      req.con,
      userId,
      "email",
      email
    );

    if (result.length) {
      return res
        .status(409)
        .send({ msg: "Email already in use by another account" });
    }

    result = await User.findOtherUserWithSameField(
      req.con,
      userId,
      "username",
      username
    );

    if (result.length) {
      return res
        .status(409)
        .send({ msg: "Username already in use by another account" });
    }

    result = await User.findOtherUserWithSameField(
      req.con,
      userId,
      "phoneNumber",
      phoneNumber
    );

    if (result.length) {
      return res
        .status(409)
        .send({ msg: "Phone Number already in use by another account" });
    }

    await User.updateProfile(
      req.con,
      userId,
      fullname,
      username,
      website,
      bio,
      email,
      phoneNumber
    );

    result = await User.getUserById(req.con, userId);
    delete result[0].password;

    return res.status(200).send({ user: result[0], msg: "Profile updated" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
