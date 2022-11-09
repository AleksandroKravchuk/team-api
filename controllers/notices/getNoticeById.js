const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getNoticeById = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findById(id);
  if (!result) {
    throw RequestError(404, `Not found notice id: ${id}`);
  } else {
    res.json({
      status: "success",
      code: 200,
      data: { notice: result },
    });
  }
};
module.exports = getNoticeById;
