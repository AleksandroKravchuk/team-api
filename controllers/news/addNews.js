const { News } = require("../../models/schemasNews");

const addNews = async (req, res) => {
  const { title, text, date } = req.body;
  const results = await News.create({ title, text, date });
  res.json({
    status: "success",
    code: 200,
    data: { news: results },
  });
};
module.exports = addNews;
