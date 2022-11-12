const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const removeNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json({
    message: "Notice removed",
  });
};

module.exports = removeNoticeById;
