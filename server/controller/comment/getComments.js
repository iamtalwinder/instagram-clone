const Joi = require("joi");
const Comment = require("../../model/Comment");

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
    const comments = await Comment.getCommentsByPostId(
      req.con,
      req.body.postId
    );
    return res.status(200).send({ comments });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
