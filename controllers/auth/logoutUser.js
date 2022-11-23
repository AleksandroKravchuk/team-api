const { User } = require("../../models");

const logoutUser = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    code: 204,
    status: "success",
    message: "The user is logged out.",
  });
};
module.exports = logoutUser;
