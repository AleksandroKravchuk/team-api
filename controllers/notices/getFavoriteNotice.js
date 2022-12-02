const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getFavoriteNotices = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const results = await Notices.find({ favorite: { $in: [_id] } }, "", {
    skip,
    limit,
  });
  if (!results) {
    throw RequestError(404, `Not found favorite notice `);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      notices: results,
    },
  });
};
module.exports = getFavoriteNotices;
