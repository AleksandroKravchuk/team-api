const multer = require("multer");
const path = require("path");
const tempDir = path.join(__dirname, "../", "tmp");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported file format" }, false);
  }
};
const uploader = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter: fileFilter,
});
module.exports = uploader;
