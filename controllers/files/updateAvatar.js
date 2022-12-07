const fs = require("fs/promises");
const path = require("path");
const { User } = require("../../models");
const { configImg, RequestError } = require("../../helpers");

const avatarsDir = path.join("public", "avatars");

const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "no file");
  }
  try {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;
    const extension = originalname.split(".").pop();
    console.log(extension);
    const filename = `${originalname}`;
    if (
      extension === "jpeg" ||
      extension === "png" ||
      extension === "bmp" ||
      extension === "tiff" ||
      extension === "gif" ||
      extension === "jpg" ||
      extension === "JPG" ||
      extension === "HEIC"
    ) {
      const parameterAvatar = {
        tempUpload,
        filename,
        avatarsDir,
        quality: 60,
        width: 233,
        height: 233,
      };
      configImg(parameterAvatar);
      await fs.unlink(tempUpload);
      const avatarURL = path.join("avatars", filename);

      await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
     return res.status(200).json({
        code: 200,
        status: "success",
        message: "avatar added",
        avatarURL: `https://out-light.herokuapp.com/${avatarURL}`,
      });
    } else {
      throw RequestError(400, "Error format file");
    }
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = updateAvatar;
