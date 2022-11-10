const fs = require("fs/promises");
const path = require("path");
const { Pets } = require("../../models/schemasPets");
const { configImg, RequestError } = require("../../helpers");
const avatarsDir = path.join("public", "pets");

const addPetInfo = async (req, res) => {
  const { comments } = req.body;
  if (!req.file) {
    throw RequestError(400, "file required");
  }
  if (!comments) {
    throw RequestError(400, "comments required");
  }
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${id}.${extension}`;
    if (
      extension === "jpeg" ||
      extension === "png" ||
      extension === "bmp" ||
      extension === "tiff" ||
      extension === "gif" ||
      extension === "jpg" ||
      extension === "JPG"
    ) {
      const parameterAvatar = {
        tempUpload,
        filename,
        avatarsDir,
        quality: 60,
        width: 288,
        height: 328,
      };
      configImg(parameterAvatar);
      await fs.unlink(tempUpload);
      const photoPet = path.join("pets", filename);
      const result = await Pets.findByIdAndUpdate(
        id,
        { comments, photoPet },
        { new: true }
      );
      if (!result) {
        throw RequestError(404, `Not found contact id: ${id}`);
      }
      res.json({
        status: "success",
        message: "Pet success added",
        code: 200,
        data: { pet: result },
      });
    } else {
      throw RequestError(400, "Error format file");
    }
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = addPetInfo;
