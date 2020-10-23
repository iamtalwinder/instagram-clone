const Joi = require("joi");
const PostLike = require("../../model/PostLike");
const Utils = require("../../model/Utils");
const PostLikes = require("../../model/PostLikes");

const validate = (data) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
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
    const userId = req.session.user.userId,
      { postId } = req.body;

    const like = await PostLike.getLike(req.con, userId, postId);

    if (!like.length) {
      return res.status(409).send({ msg: "No such like exists" });
    }

    await Utils.startTransaction(req.con);
    await PostLike.deleteLike(req.con, userId, postId);
    await PostLikes.decrement(req.con, postId);
    await Utils.commit(req.con);

    return res.status(200).send({ msg: "Post unliked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
