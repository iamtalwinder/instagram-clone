const express = require("express");
const userController = require("../controller/user");
const auth = require("./middleware/auth");

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.delete("/signout", auth, userController.signout);
router.get("/is-authorized", auth, userController.isAuthorized);
router.get("/user-profile", auth, userController.getUserProfile);

module.exports = router;
