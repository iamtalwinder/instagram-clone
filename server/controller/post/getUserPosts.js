const Joi = require("joi");
const Post = require("../../model/Post");

const validate = (data) => {
  const schema = Joi.object({
    visitedUserId: Joi.number().integer(),
    refresh: Joi.boolean(),
    start: Joi.number().integer().required(),
    offset: Joi.number().integer().required(),
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

    const visitedUserId = req.query.visitedUserId || req.session.user.userId;
    const visitorUserId = req.session.user.userId;

    if (refresh) {
      await Post.dropTempPostTable(req.con, visitedUserId, visitorUserId);
    }

    await Post.createTempPostTable(req.con, visitedUserId, visitorUserId);
    let result = await Post.getPostsByUserId(
      req.con,
      visitedUserId,
      visitorUserId,
      start,
      offset
    );

    return res.status(200).send({ posts: result });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
