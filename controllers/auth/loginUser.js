const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");
require("dotenv").config();
const { SECRET_KEY } = process.env;
const { RequestError } = require("../../helpers");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(401, "Email not found");
  } else {
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw RequestError(401, "Email or password is wrong");
    } else {
      try {
        const payload = {
          email,
        };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
        await User.findOneAndUpdate({ email }, { token });
        res.status(200).json({
          code: 200,
          status: "success",
          message: "User is logged in.",
          data: { token },
        });
      } catch (error) {
        throw RequestError(400, "Login error");
      }
    }
  }
};
module.exports = loginUser;
