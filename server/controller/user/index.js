const signup = require("./signup");
const signin = require("./signin");
const loginWithFacebook = require("./loginWithFacebook");
const signout = require("./signout");
const getCurrentUser = require("./getCurrentUser");
const getUserProfile = require("./getUserProfile");
const findUsers = require("./findUsers");
const changeDP = require("./changeDP");
const removeDP = require("./removeDP");

module.exports = {
  signup,
  signin,
  loginWithFacebook,
  signout,
  getCurrentUser,
  getUserProfile,
  findUsers,
  changeDP,
  removeDP,
};
