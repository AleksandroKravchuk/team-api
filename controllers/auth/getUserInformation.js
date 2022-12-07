const { User } = require("../../models/schemasAuth");
const { RequestError } = require("../../helpers");

const getUserInformation = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findById(_id);
  if (!result) {
    throw RequestError(404, `Not found user email: ${_id}`);
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
          avatar: result.avatar,
        },
      },
    });
  }
};
module.exports = getUserInformation;
