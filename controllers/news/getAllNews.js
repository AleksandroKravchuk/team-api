const { News } = require("../../models/schemasPets");

const getAllNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const results = await News.find({
    skip,
    limit,
  }).populate("owner", "email");
  res.json({
    status: "success",
    code: 200,
    data: {
      news: results,
    },
  });
};
module.exports = getAllNews;
