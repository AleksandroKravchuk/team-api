const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
require("dotenv").config();
const { RequestError } = require("../../helpers");

const authRegister = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const user = await User.findOne({ email });
  const secureUrl = gravatar.url(name, { s: "100", r: "x", d: "retro" }, true);
  const payload = {
    email,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  if (user) {
    throw RequestError(409, "Email in use");
  } else {
    const newUser = await User.create({
      name,
      email,
      city,
      phone,
      password: hashPassword,
      avatarURL: secureUrl,
      token,
    });

    res.status(200).json({
      code: 200,
      status: "success",
      message: "User created.",
      data: {
        user: {
          email: newUser.email,
          name: newUser.name,
          city: newUser.city,
          phone: newUser.phone,
          id: newUser._id,
          avatarURL: secureUrl,
          token: newUser.token,
        },
      },
    });
  }
};
module.exports = authRegister;
