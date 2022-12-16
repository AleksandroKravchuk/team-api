const fs = require("fs");
const { Pets } = require("../../models/schemasPets");
const { RequestError } = require("../../helpers");
const { uploads } = require("../../helpers/cloudinary");

const addPetInfoCloud = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, birth, breed, comments } = req.body;
  if (!req.file) {
    throw RequestError(400, "file required");
  }
  try {
    const { path } = req.file;
    const upload = await uploads(path, "Pets");
    fs.unlinkSync(path);

    const result = await Pets.create(
      {
        name,
        birth,
        breed,
        comments,
        photo: upload.url,
        public: upload.public_id,
        owner,
      },
      { new: true }
    );
    res.json({
      status: "success",
      message: "Notice success added",
      code: 200,
      data: { pets: result },
    });
  } catch (error) {
    fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = addPetInfoCloud;
