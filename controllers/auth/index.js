const registerUser = require("./registerUser");
const loginUser = require("./loginUser");
const logoutUser = require("./logoutUser");
const getCurrentUser = require("./getCurrentUser");
const addRegisterInformation = require("./addRegisterInformation");
const getUserInformation = require("./getUserInformation");
const updateUserInformation = require("./updateUserInformation");
const authCheck = require("./authCheck");
const authRegister= require("./authRegister");

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  addRegisterInformation,
  getUserInformation,
  updateUserInformation,
  authCheck,
  authRegister,
};
