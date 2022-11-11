const fs = require("fs/promises");
const path = require("path");
const { Notices } = require("../../models/schemasNotices");
const { configImg, RequestError } = require("../../helpers");
const avatarsDir = path.join("public", "notices");

const createNotice = async (req, res) => {
  const { id } = req.params;
  const { sex, location, price, comments } = req.body;
  // const update = { $push: { favorite: [id] } };

  if (!req.file) {
    throw RequestError(400, "file required");
  }
  // if (!comments || !sex || !location || !price) {
  //   throw RequestError(400, "All fields are required");
  // }

  // if (sex !== "male" || sex !== "female") {
  //   throw RequestError(400, "sex should be male or female");
  // }
  try {
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
      const parameterPhoto = {
        tempUpload,
        filename,
        avatarsDir,
        quality: 60,
        width: 288,
        height: 288,
      };
      configImg(parameterPhoto);
      await fs.unlink(tempUpload);
      const photo = path.join("notices", filename);

      const result = await Notices.findByIdAndUpdate(
        id,
        { sex, location, price, comments, photo },
        { new: true }
      );
      if (!result) {
        throw RequestError(404, `Not found contact id: ${id}`);
      }
      res.json({
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
