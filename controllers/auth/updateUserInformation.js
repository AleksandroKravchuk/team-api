const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserInformation = async (req, res) => {
  const { _id } = req.user;
  const { body } = req;

  const updateUserInfo = await User.findByIdAndUpdate(
    _id,
    { ...body },
    { new: true }
  );
  if (!updateUserInfo) {
    throw RequestError(404, `User email:${_id} not found.`);
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
