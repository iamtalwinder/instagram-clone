module.exports = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  next();
};
