const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserInformation = async (req, res) => {
  const { email } = req.user;
  const body = req;
  const updateUserInfo = await User.findOneAndUpdate(
    { email },
    { ...body },
    { new: true }
  );
  if (!updateUserInfo) {
    throw RequestError(404, `User email:${email} not found.`);
  }
  res.status(201).json({
    code: 200,
    status: "The user information updated",
    data: {
      user: {
        name: updateUserInfo.name,
        email: updateUserInfo.email,
        birthday: updateUserInfo.birthday,
        phone: updateUserInfo.phone,
        city: updateUserInfo.city,
      },
    },
  });
};
module.exports = updateUserInformation;
