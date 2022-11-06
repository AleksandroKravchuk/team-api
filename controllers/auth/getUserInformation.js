const { User } = require("../../models/schemasAuth");
const { RequestError } = require("../../helpers");

const getUserInformation = async (req, res) => {
  const { id } = req.user;
  const result = await User.findById(id);
  if (!result) {
    throw RequestError(404, `Not found contact id: ${id}`);
  } else {
    res.json({
      status: "success",
      code: 200,
      user: {
        name: result.name,
        email: result.email,
        birthday: result.birthday,
        phone: result.phone,
        city: result.city,
      },
    });
  }
};
module.exports = getUserInformation;
