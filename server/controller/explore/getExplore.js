const Joi = require("joi");
const Explore = require("../../model/Explore");

const validate = (data) => {
  const schema = Joi.object({
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
    const userId = req.session.user.userId,
      { refresh, start, offset } = req.query;

    if (refresh) {
      await Explore.dropTempExploreTable(req.con, userId);
    }

    await Explore.createTempExploreTable(req.con, userId);
    const posts = await Explore.getExplore(
      req.con,
      userId,
      start || 0,
      offset || 12
    );

    return res.status(200).send({ posts });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
