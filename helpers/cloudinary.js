const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
exports.uploads = async (file, folder) => {
  const options = {
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    folder,
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    console.error(error);
  }
};
exports.deleteUploads = async (file) => {
  await cloudinary.uploader.destroy(file);
};
