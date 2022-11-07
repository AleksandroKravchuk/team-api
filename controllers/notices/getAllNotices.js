const { Notices } = require("../../models/schemasNotices");

const getAllNotices = async (req, res) => {
  //   const { _id: owner } = req.user;
  const { page = 1, limit = 8 } = req.query;
  const skip = (page - 1) * limit;
  // if (favorite === null) {

  const results = await Notices.find({ }, "", {
    skip,
    limit,
  });

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
