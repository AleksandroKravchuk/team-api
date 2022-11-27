// const fs = require("fs/promises");
const fs = require("fs");
const path = require("path");
const { Notices } = require("../../models/schemasNotices");
const { configImg, RequestError } = require("../../helpers");
const avatarsDir = path.join("public", "notices");
const { uploads } = require("../../helpers/cloudinary");

const createNotice = async (req, res) => {
  const { _id: owner } = req.user;
  // console.log(req.user._id);
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
  // try {
  //   const { path: tempUpload, originalname } = req.files;
  //   const extension = originalname.split(".").pop();
  //   const filename = `${originalname}`;
  //   if (
  //     extension === "jpeg" ||
  //     extension === "png" ||
  //     extension === "bmp" ||
  //     extension === "tiff" ||
  //     extension === "gif" ||
  //     extension === "jpg" ||
  //     extension === "JPG"
  //   ) {
  // const parameterPhoto = {
  //   tempUpload,
  //   filename,
  //   avatarsDir,
  //   quality: 60,
  //   width: 288,
  //   height: 288,
  // };
  // configImg(parameterPhoto);
  // const urls = [];

  // const files = req.files;
  // for (const file of files) {
  // const { path } = req.file;
  // const upload = await uploads(path, "Notices");

  // urls.push(upload.url);
  // fs.unlinkSync(path);
  // }
  // console.log(upload);
  // const photo = await uploads(filename, {
  //   folder: "Notices",
  // });

  // const photo = path.join("notices", filename);

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
      photo: req.file.path,
      owner,
    },
    { new: true }
  );
  // await fs.unlink(tempUpload);
  // if (!result) {
  //   throw RequestError(404, `Not found contact id: ${_id}`);
  // }
  res.json({
    status: "success",
    message: "Notice success added",
    code: 200,
    data: { notice: result },
  });
  //   } else {
  //     throw RequestError(400, "Error format file");
  //   }
  // } catch (error) {
  //   await fs.unlink(req.file.path);
  //   throw error;
  // }
};
module.exports = createNotice;
