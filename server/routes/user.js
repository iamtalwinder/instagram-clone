const express = require("express");
const userController = require("../controller/user");
const auth = require("./middleware/auth");
const uploadImage = require("./middleware/uploadImage");
const removeDP = require("./middleware/removeDP");
const resizeDP = require("./middleware/resizeDP");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.delete("/signout", auth, userController.signout);
router.get("/is-authorized", auth, userController.isAuthorized);
router.get("/user-profile", auth, userController.getUserProfile);
router.patch(
  "/change-dp",
  auth,
  removeDP,
  uploadImage,
  resizeDP,
  userController.changeDP
);

module.exports = router;
