const authenticate = require("./authenticate");
const upload = require("./upload");
const isValidId = require("./isValidId");
const getRole = require("./roleAuth");
module.exports = {
  authenticate,
  upload,
  isValidId,
  getRole,
};
