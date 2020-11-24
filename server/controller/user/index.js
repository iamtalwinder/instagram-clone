const signup = require("./signup");
const signin = require("./signin");
const loginWithFacebook = require("./loginWithFacebook");
const signout = require("./signout");
const isAuthorized = require("./isAuthorized");
const getUserProfile = require("./getUserProfile");
const findUsers = require("./findUsers");
const changeDP = require("./changeDP");
const removeDP = require("./removeDP");

module.exports = {
  signup,
  signin,
  loginWithFacebook,
  signout,
  isAuthorized,
  getUserProfile,
  findUsers,
  changeDP,
  removeDP,
};
