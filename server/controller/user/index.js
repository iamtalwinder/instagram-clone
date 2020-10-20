const signup = require("./signup");
const signin = require("./signin");
const signout = require("./signout");
const isAuthorized = require("./isAuthorized");
const getUserProfile = require("./getUserProfile");
const changeDP = require("./changeDP");

module.exports = {
  signup,
  signin,
  signout,
  isAuthorized,
  getUserProfile,
  changeDP,
};
