const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getAllNotices = async (req, res) => {
  let { value } = req.params;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  // if (favorite === null) {
  if (value === "for-free") {
    value = "in good hands";
  }
  const results = await Notices.find({ category: { $in: [value] } }, "", {
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
  // } else {
  //   const results = await Pets.find({ owner, favorite }, "", {
  //     skip,
  //     limit,
  //   }).populate("owner", "email");
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       pets: results,
  //     },
  //   });
  // }
};
module.exports = getAllNotices;
