require("dotenv").config();
const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const authCheck = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  } else {
    res.status(200).json({
      code: 200,
      status: "success",
      message: "User may be created.",
      user: {
        email,
        password,
      },
    });
  }
};
module.exports = authCheck;
