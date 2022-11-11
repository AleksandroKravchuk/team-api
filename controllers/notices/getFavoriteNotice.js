const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getFavoriteNotices = async (req, res) => {
  const { id } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;

  const results = await Notices.find({ favorite: { $in: [id] } }, "", {
    skip,
    limit,
  });
  if (!results || results.length === 0) {
    throw RequestError(404, `Not found favorite notice `);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      pets: results,
    },
  });
};
module.exports = getFavoriteNotices;