const { User } = require("../../models");

const logoutUser = async (req, res) => {
  const { email } = req.user;
  await User.findOneAndUpdate({ email }, { token: "" });
  res.status(204).json({
    code: 204,
    status: "success",
    message: "The user is logged out.",
  });
};
module.exports = logoutUser;
