const axios = require("axios");
const User = require("../../model/User");
const Utils = require("../../model/Utils");
const Followers = require("../../model/Followers");
const Following = require("../../model/Following");

module.exports = async (req, res) => {
  try {
    const { code } = req.body;

    const response = await axios.get(
      "https://graph.facebook.com/v4.0/oauth/access_token",
      {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          redirect_uri:
            process.env.FACEBOOK_REDIRECT_URI || "http://localhost:3000/",
          code: code,
        },
      }
    );

    const { data: userData } = await axios.get(
      "https://graph.facebook.com/me",
      {
        params: {
          fields: ["id", "email", "first_name", "last_name"].join(","),
          access_token: response.data.access_token,
        },
      }
    );

    let result = await User.getUserById(req.con, userData.id);

    if (!result.length) {
      result = await User.getUserByEmail(req.con, userData.email);

      if (result.length) {
        return res.status(409).send({
          field: "email",
          msg: "Email already in use",
        });
      }

      const username =
        userData.first_name.substring(0, 6) +
        Date.now().toString().substring(8);

      const fullname = userData.first_name + " " + userData.last_name;

      await Utils.startTransaction(req.con);

      await User.createUser(
        req.con,
        fullname,
        username,
        userData.email,
        "facebook",
        userData.id
      );

      await Followers.create(req.con, userData.id, 0);
      await Following.create(req.con, userData.id, 0);

      await Utils.commit(req.con);

      result = await User.getUserById(req.con, userData.id);
    }

    delete result[0].password;
    req.session.user = result[0];

    return res.status(200).send({ user: result[0], msg: "Signin successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).send({ msg: "Internal server error" });
  }
};
