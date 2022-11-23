const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const deleteNoticeFavorite = async (req, res) => {
  const { _id } = req.user;
  const { noticeId } = req.params;

  const update = { $pull: { favorite: _id } };
  const result = await Notices.findByIdAndUpdate(noticeId, update, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Notice owner:${_id} not found.`);
  }
  res.status(200).json({
    code: 200,
    status: "delete favorite into notices",
    data: {
      notice: result,
    },
  });
};
module.exports = deleteNoticeFavorite;
