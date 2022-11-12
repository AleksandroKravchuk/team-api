const { Friends } = require("../../models/schemasFriends");

const getAllFriends = async (req, res) => {
  const { page = 1, limit = 9 } = req.query;
  const skip = (page - 1) * limit;

  const results = await Friends.find({
    skip,
    limit,
  });
  res.json({
    code: 200,
    status: "success",
    message: "all friends",
    data: {
      friends: results,
    },
  });
};
module.exports = getAllFriends;
