const cloudinary = require("../../helpers/cloudinary");
const fs = require("fs");

const addPhoto = async (req, res) => {
  const uploader = async (path) =>
    await cloudinary.uploads(path, "ImagesNotices");
  if (req.method === "POST") {
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    res.status(200).json({
      message: "images uploaded successfully",
      data: urls,
    });
  } else {
    res.status(405).json({
      err: `${req.method} method not allowed`,
    });
  }
};
module.exports = addPhoto;
