module.exports = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).send("Internal server error");
    } else {
      res
        .status(200)
        .clearCookie(process.env.SESSION_COOKIE_NAME)
        .send("SignOut Successful");
    }
  });
};
