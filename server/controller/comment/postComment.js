const Joi = require("joi");
const { v4: uuidv4 } = require("uuid");
const Post = require("../../model/Post");
const Comment = require("../../model/Comment");
const Comments = require("../../model/Comments");
const Utils = require("../../model/Utils");

const validate = (data) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
    comment: Joi.string().min(1).max(100).required(),
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
    const { postId, comment } = req.body;
    const commentId = uuidv4();

    const result = await Post.getPostByPostId(req.con, postId);

    if (!result.length) {
      return res.status(400).send({ msg: "No such post exists" });
    }

    await Utils.startTransaction(req.con);
    await Comment.createComment(req.con, commentId, postId, userId, comment);
    await Comments.increment(req.con, postId);
    await Utils.commit(req.con);

    return res
      .status(201)
      .send({ commentId: commentId, postId: postId, comment: comment });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
