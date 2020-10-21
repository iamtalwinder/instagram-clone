const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

module.exports = async (req, res, next) => {
  try {
    const postId = uuidv4();
    req.file.postId = postId;
    req.file.filePath = `uploads/${postId}`;

    await sharp(req.file.buffer)
      .resize(200, 200)
      .toFormat("jpeg")
      .jpeg({ quality: 50 })
      .toFile(`uploads/${postId}_thumb.jpeg`);

    await sharp(req.file.buffer)
      .resize(400, 450)
      .toFormat("jpeg")
      .jpeg({ quality: 100 })
      .toFile(`uploads/${postId}.jpeg`);

    next();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ msg: "An error has occurred while uploading" });
  }
};
