const Joi = require("joi");
const Post = require("../../model/Post");
const PostLike = require("../../model/PostLike");
const PostLikes = require("../../model/PostLikes");
const Utils = require("../../model/Utils");

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

    const post = await Post.getPostByPostId(req.con, postId);

    if (!post.length) {
      return res.status(400).send({ msg: "No such post exists" });
    }

    const like = await PostLike.getLike(req.con, userId, postId);

    if (like.length) {
      return res.status(409).send({ msg: "You've already liked this post" });
    }

    await Utils.startTransaction(req.con);
    await PostLike.createLike(req.con, userId, postId);
    await PostLikes.increment(req.con, postId);
    await Utils.commit(req.con);

    return res.status(201).send({ msg: "Post liked" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
