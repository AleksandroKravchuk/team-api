const jwt = require("jsonwebtoken");
const { User } = require("../models");
const { SECRET_KEY } = process.env;
const { RequestError } = require("../helpers");

const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer = "", token = ""] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      throw RequestError(401, "Missing header with authorization token.");
    } else {
      try {
        const { email } = jwt.verify(token, SECRET_KEY);
        const user = await User.findOne({ email });
        if (!user || !user.token) {
          throw RequestError(401, "Not authorized");
        } else {
          req.user = user;
          next();
        }
      } catch (error) {
        throw RequestError(401, "Not authorized");
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticate;
