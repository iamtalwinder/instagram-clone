const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  try {
    const dpname = uuidv4();
    req.file.dpPath = `uploads/${dpname}`;

    await sharp(req.file.buffer)
      .resize(50, 50)
      .toFormat("jpeg")
      .jpeg({ quality: 30 })
      .toFile(`uploads/${dpname}_thumb.jpeg`);

    await sharp(req.file.buffer)
      .resize(150, 150)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toFile(`uploads/${dpname}.jpeg`);

    next();
  } catch (err) {
    console.log(err);
    return res
      .status(400)
      .send({ msg: "An error has occurred while uploading" });
  }
};
