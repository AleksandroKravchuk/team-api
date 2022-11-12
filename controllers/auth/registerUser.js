// const { nanoid } = require("nanoid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  } else {
    const newUser = await User.create({
      email,
      password: hashPassword,
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "User created.",
      data: {
        user: {
          email: newUser.email,
          id: newUser._id,
        },
      },
    });
  }
};
module.exports = registerUser;
