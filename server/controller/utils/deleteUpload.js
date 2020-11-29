const fs = require("fs");

module.exports = (path) => {
  if (path && fs.existsSync(`${path}_thumb.jpeg`)) {
    fs.unlink(`${path}_thumb.jpeg`, (err) => {
      if (err) console.log(err);
    });
  }

  if (path && fs.existsSync(`${path}.jpeg`)) {
    fs.unlink(`${path}.jpeg`, (err) => {
      if (err) console.log(err);
    });
  }
};
