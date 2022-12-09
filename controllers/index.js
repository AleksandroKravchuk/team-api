const pets = require("./pets");
const auth = require("./auth");
const files = require("./files");
const news = require("./news");
const friends = require("./friends");
const notices = require("./notices");
const { googleAuth, googleRedirect } = require("./google/googleAuth");

module.exports = {
  pets,
  auth,
  files,
  news,
  friends,
  notices,
  googleAuth,
  googleRedirect,
};
