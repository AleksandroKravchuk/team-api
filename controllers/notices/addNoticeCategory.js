const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const changeFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Notices.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};
module.exports = changeFavorite;
