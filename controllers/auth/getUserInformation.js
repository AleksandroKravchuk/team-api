const { User } = require("../../models/schemasAuth");
const { RequestError } = require("../../helpers");

const getUserInformation = async (req, res) => {
  const { email } = req.user;
  const result = await User.findOne({ email });
  if (!result) {
    throw RequestError(404, `Not found user email: ${email}`);
  } else {
    res.json({
      status: "success",
      code: 200,
      message: "user information",
      data: {
        user: {
          name: result.name,
          email: result.email,
          birthday: result.birthday,
          phone: result.phone,
          city: result.city,
          logo: result.avatarURL,
        },
      },
    });
  }
};
module.exports = getUserInformation;
