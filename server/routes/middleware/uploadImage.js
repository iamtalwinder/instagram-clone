const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(
      {
        name: "MulterError",
        message: "jpeg, jpg or png only",
      },
      false
    );
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: fileFilter,
});

const uploadFile = upload.single("img");

module.exports = (req, res, next) => {
  uploadFile(req, res, (err) => {
    if (!req.file) {
      return res.status(400).send({ msg: "Select a file" });
    }
    if (err) {
      if (err.name === "MulterError") {
        return res.status(400).send({ msg: err.message });
      }
      console.log(err);
      return res
        .status(400)
        .send({ msg: "An error has occurred while uploading" });
    }

    next();
  });
};
