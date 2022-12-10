const queryString = require("query-string");
const axios = require("axios");
const bcrypt = require("bcrypt");
const { User } = require("../../models");
const gravatar = require("gravatar");
const { RequestError } = require("../../helpers");
// const URL = require("url");

exports.googleAuth = async (req, res) => {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,

    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  return res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
  );
};

exports.googleRedirect = async (req, res) => {
  const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
  const urlObj = new URL(fullUrl);
  const urlParams = queryString.parse(urlObj.search);

  const { code } = urlParams;
  const tokenData = await axios({
    url: "https://oauth2.googleapis.com/token",
    method: "post",
    data: {
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL}/auth/google-redirect`,
      grant_type: "authorization_code",
      code,
    },
  });
  const userData = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: { Authorization: `Bearer ${tokenData.data.access_token}` },
  });
  console.log(userData);
  const { email } = userData.data;
  const user = await User.findOne({ email });
  if (user) {
    res.status(200).json({
      code: 200,
      status: "success",
      message: "User authorization",
      data: {
        name: user.name,
        //  city: userCreate.city,
        //  phone: userCreate.phone,
        token: tokenData.data.access_token,
        id: user._id,
        email: user.email,
        avatar: user.avatar,
        avatarUrl: user.avatarURL,
      },
    });
  } else {
    const secureUrl = gravatar.url(
      userData.email,
      { s: "100", r: "x", d: "retro" },
      true
    );
    const hashPassword = await bcrypt.hash(userData.data.id, 10);
    const newUser = await User.create({
      email: userData.data.email,
      password: hashPassword,
      name: userData.data.name,
      // city,
      // phone,
      avatar: secureUrl,
      // token: "",
    });
    res.status(200).json({
      code: 200,
      status: "success",
      message: "User authorization",
      data: {
        name: newUser.name,
        //  city: userCreate.city,
        //  phone: userCreate.phone,
        token: tokenData.data.access_token,
        id: newUser._id,
        email: newUser.email,
        avatar: newUser.avatar,
        avatarUrl: newUser.avatarURL,
      },
    });
  }
  return res.redirect(
    `${process.env.FRONTEND_URL}?email=${userData.data.email}`
    // `${process.env.FRONTEND_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`
  );
};
