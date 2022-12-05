const { Notices } = require("../../models/schemasNotices");
const { deleteUploads } = require("../../helpers/cloudinary");
const { RequestError } = require("../../helpers");

const deleteNotice = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Notices.findOne({ _id: id, owner });
  if (!result) {
    throw RequestError(404, `Not found notice id: ${id} owner:${owner}`);
  }

  // await deleteUploads(result.public);
  await result.remove();
  res.json({
    status: "success",
    code: 200,
    message: "notice success deleted, cloud image deleted",
    data: { notice: result },
  });
};
module.exports = deleteNotice;
