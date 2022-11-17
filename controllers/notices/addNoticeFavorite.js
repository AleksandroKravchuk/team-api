const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const addNoticeFavorite = async (req, res) => {
  const { email } = req.user;

  const { noticeId } = req.params;
  //   const { favorite } = req.body;
  const update = { $push: { favorite: [email] } };
  const result = await Notices.findByIdAndUpdate(noticeId, update, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, `Notice email:${email} not found.`);
  }
  res.status(200).json({
    code: 200,
    status: "Notice added to favorite",
    data: {
      notice: result,
    },
  });
};
module.exports = addNoticeFavorite;
