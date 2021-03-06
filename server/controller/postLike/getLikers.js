const Joi = require("joi");
const PostLike = require("../../model/PostLike");

const validate = (data) => {
  const schema = Joi.object({
    postId: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = async (req, res) => {
  const { error } = validate(req.query);
  if (error) {
    return res.status(406).send({
      field: error.details[0].context.label,
      msg: error.details[0].message,
    });
  }

  try {
    const userId = req.session.user.userId;
    const likers = await PostLike.getLikers(req.con, req.query.postId, userId);
    return res.status(200).send({ likers });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
