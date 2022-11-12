const { News } = require("../../models/schemasNews");

const getAllNews = async (req, res) => {
  const { page = 1, limit = 6 } = req.query;
  const skip = (page - 1) * limit;

  const results = await News.find({
    skip,
    limit,
  });
  res.json({
    code: 200,
    status: "success",
    message: "all news",
    data: { news: results },
  });
};
module.exports = getAllNews;
