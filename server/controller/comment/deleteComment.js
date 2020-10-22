const Joi = require("joi");
const Comment = require("../../model/Comment");
const Comments = require("../../model/Comments");
const Utils = require("../../model/Utils");

const validate = (data) => {
  const schema = Joi.object({
    commentId: Joi.string().required(),
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
    const userId = req.session.user.userId;
    const { commentId } = req.body;

    const result = await Comment.getComment(req.con, userId, commentId);
    if (!result.length) {
      return res.status(400).send({ msg: "No such comment exists" });
    }

    const { postId } = result[0];

    await Utils.startTransaction(req.con);
    await Comment.deleteComment(req.con, userId, commentId);
    await Comments.decrement(req.con, postId);
    await Utils.commit(req.con);

    return res.status(200).send({ msg: "Comment deleted" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
