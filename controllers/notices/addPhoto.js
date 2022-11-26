// const { uploads } = require("../../helpers/cloudinary");
const fs = require("fs");
const { RequestError } = require("../../helpers");
const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_SECRET: process.env.CLOUDINARY_API_SECRET,
});

const addPhoto = async (req, res) => {
  if (!req.files) {
    throw RequestError(400, "file required");
  }

  if (req.method === "POST") {
    const urls = [];

    const files = req.files;
    // console.log(files);
    for (const file of files) {
      const { path } = file;
      const upload = await cloudinary.uploader.upload(path, {
        folder: "Notices",
      });
      urls.push(upload.url);
      fs.unlinkSync(path);
    }
    console.log(urls);
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
