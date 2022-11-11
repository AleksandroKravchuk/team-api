const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const addNoticeFavorite = async (req, res) => {
  const { id } = req.user;

  const { noticeId } = req.params;
  //   const { favorite } = req.body;
  const update = { $push: { favorite: [id] } };
  const result = await Notices.findByIdAndUpdate(noticeId, update, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Notice id:${id} not found.`);
  }
  res.status(200).json({
    code: 200,
    status: "The user information updated",
    data: {
      notice: result,
    },
  });
};
module.exports = addNoticeFavorite;
