const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");

const getUserInformation = require("./getUserInformation");
const updateUserInformation = require("./updateUserInformation");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  getUserInformation,
  updateUserInformation,
};
