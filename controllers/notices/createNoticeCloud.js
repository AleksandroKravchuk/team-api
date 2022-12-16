const fs = require("fs/promises");
// const path = require("path");
const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");
// const cloudinary = require("cloudinary").v2;
require("dotenv").config();

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_SECRET: process.env.CLOUDINARY_API_SECRET,
// });
const { uploads } = require("../../helpers/cloudinary");

const createNoticeCloud = async (req, res) => {
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
  const { path } = req.file;
  // const folder = "Notices";
  const upload = await uploads(path, "Notices");
  // fs.unlinkSync(path);
  try {
    // const upload = await cloudinary.uploader.upload(path, {
    //   folder,
    // });

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
      data: { notice: result },
    });
    // fs.unlinkSync(path);
  } catch (error) {
    fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = createNoticeCloud;
