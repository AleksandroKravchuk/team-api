const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const deleteNoticeFavorite = async (req, res) => {
  const { email} = req.user;
  const { noticeId } = req.params;

  const update = { $pull: { favorite: email } };
  const result = await Notices.findByIdAndUpdate(noticeId, update, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Notice email:${email} not found.`);
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
