const { News } = require("../../models/schemasNews");
const { RequestError } = require("../../helpers");

const getNewsById = async (req, res) => {
  const { id } = req.params;
  const result = await News.findById(id);
  if (!result) {
    throw RequestError(404, `Not found news id: ${id}`);
  } else {
    res.json({
      code: 200,
      status: "success",
      message: "one news",
      data: { news: result },
    });
  }
};
module.exports = getNewsById;
