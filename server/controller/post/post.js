const fs = require("fs");
const Joi = require("joi");
const Post = require("../../model/Post");
const PostLikes = require("../../model/PostLikes");
const Comments = require("../../model/Comments");
const Utils = require("../../model/Utils");

const validate = (data) => {
  const schema = Joi.object({
    caption: Joi.string().max(100),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  try {
    const userId = req.session.user.userId;
    const { postId, filePath } = req.file;

    const { error } = validate(req.body);

    if (error) {
      fs.unlinkSync(`${filePath}.jpeg`);
      fs.unlinkSync(`${filePath}_thumb.jpeg`);
      return res.status(406).send({
        field: error.details[0].context.label,
        msg: error.details[0].message,
      });
    }

    await Utils.startTransaction(req.con);
    await Post.createPost(
      req.con,
      postId,
      userId,
      filePath,
      req.body.caption || null
    );
    await PostLikes.create(req.con, postId, 0);
    await Comments.create(req.con, postId, 0);
    await Utils.commit(req.con);

    res.status(201).send({ postId: postId, msg: "Uploaded" });
  } catch (err) {
    console.log(err);

    fs.unlink(`${filePath}.jpeg`, (err) => {
      console.log(err);
    });

    fs.unlink(`${filePath}_thumb.jpeg`, (err) => {
      console.log(err);
    });
    return res.status(500).send({ msg: "Internal server error" });
  }
};
