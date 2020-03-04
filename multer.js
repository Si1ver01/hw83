const multer = require("multer");
const nanoid = require("nanoid");
const path = require("path");

const rootPath = __dirname;
const uploadPath = path.join(rootPath, "public", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename(req, file, callback) {
    callback(null, nanoid() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage });
