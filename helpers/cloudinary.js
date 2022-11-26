const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_SECRET: process.env.CLOUDINARY_API_SECRET,
});
exports.uploads = async (file, folder) => {
  await cloudinary.uploader.upload(file, {
    folder,
  });
  // return upload;
};
