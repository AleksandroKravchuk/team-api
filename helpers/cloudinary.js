const cloudinary = require("cloudinary").v2;
require("dotenv").config();
// export CLOUDINARY_URL = cloudinary://API_KEY:API_SECRET@CLOUD_NAME

console.log(process.env.CLOUD_NAME);
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
    folder: "Notices",
  };

  try {
    // Upload the image
    const result = await cloudinary.uploader.upload(file, options);
    return result;
  } catch (error) {
    console.error(error);
  }
  // const upload = await cloudinary.uploader.upload(file, {
  //   folder,
  // });
  // return upload;
};
exports.deleteUploads = async (file) => {
  await cloudinary.uploader.destroy(file);
};
