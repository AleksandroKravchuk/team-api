const { Pets } = require("../../models/schemasPets");
const { deleteUploads } = require("../../helpers/cloudinary");

const deletePet = async (req, res) => {
  const { id } = req.params;
  const { RequestError } = require("../../helpers");

  const result = await Pets.findByIdAndRemove({ _id: id });
  if (!result) {
    throw RequestError(404, `Not found pet id: ${id}`);
  }
  await deleteUploads(result.public);
  res.json({
    status: "success",
    code: 200,
    message: "pet success deleted",
    data: { pet: result },
  });
};
module.exports = deletePet;
