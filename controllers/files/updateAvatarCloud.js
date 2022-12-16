const fs = require("fs");
const { User } = require("../../models/schemasAuth");
const { RequestError } = require("../../helpers");
const { uploads } = require("../../helpers/cloudinary");

const updateAvatarCloud = async (req, res) => {
  if (!req.file) {
    throw RequestError(400, "file required");
  }
  try {
    const { _id } = req.user;
    const { path } = req.file;
    const upload = await uploads(path, "Avatar");
    fs.unlinkSync(path);
    console.log(_id);
    await User.findByIdAndUpdate(_id, { avatarURL: upload.url }, { new: true });
    return res.status(200).json({
      code: 200,
      status: "success",
      message: "avatar added",
      avatarURL: upload.url,
    });
  } catch (error) {
    fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatarCloud;
