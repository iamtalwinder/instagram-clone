const Joi = require("joi");
const Follow = require("../../model/Follow");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");
const User = require("../../model/User");
const Utils = require("../../model/Utils");

const validate = (data) => {
  const schema = Joi.object({
    userToFollow: Joi.number().integer().required(),
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
    const userToFollow = req.body.userToFollow,
      follower = req.session.user.userId;

    if (userToFollow === follower) {
      return res.status(400).send({
        msg: "You cannot follow yourself",
      });
    }

    const follow = await Follow.getFollow(req.con, userToFollow, follower);

    if (follow.length) {
      return res.status(409).send({ msg: "Already following this user" });
    }

    const user = await User.getUserById(req.con, userToFollow);

    if (!user.length) {
      return res.status(400).send({ msg: "No such user exists" });
    }

    await Utils.startTransaction(req.con);
    await Follow.createFollow(req.con, userToFollow, follower);
    await Followers.increment(req.con, userToFollow);
    await Following.increment(req.con, follower);
    await Utils.commit(req.con);

    return res.status(201).send({ msg: "Follow successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
