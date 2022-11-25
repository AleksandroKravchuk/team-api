const authenticate = require("./authenticate");
const upload = require("./upload");
const isValidId = require("./isValidId");
const uploader = require("./multer");

module.exports = {
  authenticate,
  upload,
  isValidId,
  uploader,
};
