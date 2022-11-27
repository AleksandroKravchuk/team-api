require("dotenv").config();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;
const gravatar = require("gravatar");
const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const addRegisterInformation = async (req, res) => {
  const { id } = req.params;
  const { name, city, phone } = req.body;

  const secureUrl = gravatar.url(name, { s: "100", r: "x", d: "retro" }, true);
  const payload = {
    id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "10h" });
  const addInfoRegister = await User.findByIdAndUpdate(
    id,
    { name, city, phone, avatarURL: secureUrl, token },
    { new: true }
  );
  if (!addInfoRegister || addInfoRegister.length === 0) {
    throw RequestError(400, `Not found user id:${id}`);
  }
  res.status(201).json({
    code: 201,
    status: "The user was successfully registered.",
    data: {
      user: {
        name: addInfoRegister.name,
        email: addInfoRegister.email,
        id: addInfoRegister._id,
        phone: addInfoRegister.phone,
        city: addInfoRegister.city,
        avatarURL: secureUrl,
        token: addInfoRegister.token,
      },
    },
  });
};
module.exports = addRegisterInformation;
