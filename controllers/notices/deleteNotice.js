const { Notices } = require("../../models/schemasNotices");

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const { RequestError } = require("../../helpers");

  const result = await Notices.findByIdAndRemove({ _id: id });
  if (!result) {
    throw RequestError(404, `Not found contact id: ${id}`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "notice success deleted",
    data: { notice: result },
  });
};
module.exports = deleteNotice;