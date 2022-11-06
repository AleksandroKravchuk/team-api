const { User } = require("../../models");
const { RequestError } = require("../../helpers");

const updateUserInformation = async (req, res) => {
  const { id } = req.user;
  const { name, city, phone, birthday, email } = req.body;
  try {
    const updateUserInfo = await User.findByIdAndUpdate(
      id,
      { name, city, phone, birthday, email },
      { new: true }
    );
    if (!updateUserInfo) {
      throw RequestError(404, `User id:${id} not found.`);
    }
    res.status(201).json({
      code: 200,
      status: "The user information updated",
      user: {
        name: updateUserInfo.name,
        email: updateUserInfo.email,
        birthday: updateUserInfo.birthday,
        phone: updateUserInfo.phone,
        city: updateUserInfo.city,
      },
    });
  } catch (error) {
    throw RequestError(400, "User update failed.");
  }
};
module.exports = updateUserInformation;
