const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const Post = require("../../model/Post");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `./uploads/`);
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4());
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(null, false);
      cb({ msg: "jpeg or jpg or png or gif only" });
    }
  },
}).single("img");

module.exports = (req, res) => {
  const userId = req.session.user.userId;

  upload(req, res, async (err) => {
    if (err) {
      res.status(400).send(err);
    } else if (!req.file) {
      res.status(400).send({ msg: "Select a file" });
    } else {
      try {
        await Post.createPost(
          req.con,
          req.file.filename,
          userId,
          `uploads/${req.file.filename}`,
          req.body.caption
        );
        res.status(200).send({ msg: "Uploaded" });
      } catch (err) {
        console.log(err);

        fs.unlink(req.file.path, (err) => {
          if (err) console.log(err);
        });

        return res.status(500).send({ msg: "Internal server error" });
      }
    }
  });
};
