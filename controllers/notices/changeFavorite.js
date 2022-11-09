const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const changeFavorite = async (req, res) => {
  const { id } = req.params;
  // const { favorite, category } = req.body;

  const update = { $push: { favorite: [id] } };
  const result = await Notices.findByIdAndUpdate(id, update, {
    new: true,
  });

  if (!result) {
    throw RequestError(404, `Notice id:${id} not found.`);
  }
  res.status(201).json({
    code: 200,
    status: "The user information updated",
    data: {
      notice: result,
    },
  });
};
module.exports = changeFavorite;
