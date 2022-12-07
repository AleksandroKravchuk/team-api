// const fs = require("fs/promises");
const fs = require("fs/promises");
const path = require("path");
const { Notices } = require("../../models/schemasNotices");
const { configImg, RequestError } = require("../../helpers");
const avatarsDir = path.join("public", "photoNotice");
// const { uploads } = require("../../helpers/cloudinary");
const { nanoid } = require("nanoid");

const createNotice = async (req, res) => {
  const { _id: owner } = req.user;
  const {
    category,
    title,
    name,
    birth,
    breed,
    sex,
    location,
    price,
    comments,
  } = req.body;

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
      const parameterPhoto = {
        tempUpload,
        filename,
        avatarsDir,
        quality: 60,
        width: 288,
        height: 288,
      };
      configImg(parameterPhoto);
      const photo = path.join("photoNotice", filename);
      await fs.unlink(tempUpload);
      const result = await Notices.create(
        {
          category,
          title,
          name,
          birth,
          breed,
          sex,
          location,
          price,
          comments,
          photo: `https://out-light.herokuapp.com/${photo}`,
          owner,
        },
        { new: true }
      );
      return res.json({
        status: "success",
        message: "Notice success added",
        code: 200,
        data: { notice: result },
      });
    } else {
      throw RequestError(400, "Error format file");
    }
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = createNotice;
