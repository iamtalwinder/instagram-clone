const Joi = require("joi");
const Follow = require("../../model/Follow");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");
const Utils = require("../../model/Utils");

const validate = (data) => {
  const schema = Joi.object({
    userToUnfollow: Joi.number().integer().required(),
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
    const userToUnfollow = req.body.userToUnfollow,
      follower = req.session.user.userId;

    const result = await Follow.getFollow(req.con, userToUnfollow, follower);

    if (!result.length) {
      return res.status(400).send({ msg: "You're not following this user" });
    }

    await Utils.startTransaction(req.con);
    await Follow.deleteFollow(req.con, userToUnfollow, follower);
    await Followers.decrement(req.con, userToUnfollow);
    await Following.decrement(req.con, follower);
    await Utils.commit(req.con);

    return res.status(200).send({ msg: "Unfollow successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
