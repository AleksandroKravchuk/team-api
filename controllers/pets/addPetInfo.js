const fs = require("fs/promises");
const path = require("path");
const { Pets } = require("../../models/schemasPets");
const { configImg, RequestError } = require("../../helpers");
const avatarsDir = path.join("public", "photoPet");
const { nanoid } = require("nanoid");

const addPetInfo = async (req, res) => {
  const { _id: owner } = req.user;
  const { name, birth, breed, comments } = req.body;
  if (!req.file) {
    throw RequestError(400, "file required");
  }
  try {
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    const filename = `${nanoid()}.${extension}`;
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
        width: 328,
        height: 328,
      };
      configImg(parameterAvatar);
      const photo = path.join("photoPet", filename);

      await fs.unlink(tempUpload);
      const result = await Pets.create(
        {
          name,
          breed,
          birth,
          comments,
          photoPet: `https://out-light.herokuapp.com/${photo}`,
          owner,
        },
        { new: true }
      );
    return  res.json({
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
