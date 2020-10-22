const Joi = require("joi");
const Post = require("../../model/Post");

const validate = (data) => {
  const schema = Joi.object({
    userId: Joi.number().integer(),
    refresh: Joi.boolean(),
    start: Joi.number().integer(),
    offset: Joi.number().integer(),
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
    const { refresh, start, offset } = req.query;

    const userId = req.query.userId || req.session.user.userId;

    if (refresh) {
      await Post.dropTempPostTable(req.con, userId);
    }

    await Post.createTempPostTable(req.con, userId);
    let result = await Post.getPostsByUserId(
      req.con,
      userId,
      start || 0,
      offset || 12
    );

    return res.status(200).send({ posts: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
