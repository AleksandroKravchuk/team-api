// const { nanoid } = require("nanoid");
require("dotenv").config();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { RequestError } = require("../../helpers");

const registerUser = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  const secureUrl = gravatar.url(email, { s: "100", r: "x", d: "retro" }, true);
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  } else {
    const newUser = await User.create({
      email,
      password: hashPassword,
      name,
      city,
      phone,
      avatarURL: secureUrl,
      token: "",
    });
    // const em = newUser.email;
    const payload = {
      id: newUser._id,
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
    const userCreate = await User.findOneAndUpdate({ email }, { token });
    res.status(200).json({
      code: 200,
      status: "success",
      message: "User created.",
      data: {
        name: userCreate.name,
        city: userCreate.city,
        phone: userCreate.phone,
        token,
        id: userCreate._id,
        email: userCreate.email,
        avatarURL: userCreate.avatarURL,
      },
    });
  }
};
module.exports = registerUser;
