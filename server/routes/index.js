const express = require("express");
const userController = require("../controller/user");

const router = express.Router();

const auth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).send({ msg: "Unauthorized" });
  }
  next();
};

router.post("/signup", userController.signup);
router.post("/signin", userController.signin);
router.delete("/signout", auth, userController.signout);
router.get("/isAuthorized", auth, userController.isAuthorized);

module.exports = router;
