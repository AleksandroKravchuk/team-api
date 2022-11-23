const { Notices } = require("../../models/schemasNotices");

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { RequestError } = require("../../helpers");

  const result = await Notices.findOneAndDelete({ _id: id, owner });
  if (!result) {
    throw RequestError(404, `Not found notice id: ${id} owner:${owner}`);
  }
  res.json({
    status: "success",
    code: 200,
    message: "notice success deleted",
    data: { notice: result },
  });
};
module.exports = deleteNotice;
