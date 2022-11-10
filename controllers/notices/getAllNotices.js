const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getAllNotices = async (req, res) => {
  let { value } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  if (value === "for-free") {
    value = "in good hands";
  }
  // { category: { $in: [value] }
  const results = await Notices.find({ category: value }, "", {
    skip,
    limit,
  });
  if (!results || results.length === 0) {
    throw RequestError(404, `Not found notices with category ${value} `);
  }
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      notices: results,
    },
  });
};
module.exports = getAllNotices;
