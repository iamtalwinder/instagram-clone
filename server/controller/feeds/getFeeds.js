const Feeds = require("../../model/Feeds");

module.exports = async (req, res) => {
  const userId = req.session.user.userId,
    { refresh, start, offset } = req.query;
  try {
    if (refresh) {
      await Feeds.dropTempFeedsTable(req.con, userId);
    }
    await Feeds.createTempFeedsTable(req.con, userId);
    const feeds = await Feeds.getFeeds(
      req.con,
      userId,
      start || 0,
      offset || 12
    );
    return res.status(200).send({ feeds });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
