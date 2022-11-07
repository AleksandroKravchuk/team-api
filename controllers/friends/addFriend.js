const { Friends } = require("../../models/schemasFriends");

const addFriend = async (req, res) => {
  const { name, logo, time, address, email, phone } = req.body;
  const results = await Friends.create({
    name,
    logo,
    time,
    address,
    email,
    phone,
  });
  res.json({
    status: "success",
    code: 200,
    message: "News added",
    data: {
      friends: results,
    },
  });
};
module.exports = addFriend;
