const fs = require("fs/promises");
// const path = require("path");
const { Notices } = require("../../models/schemasNotices");
// const { configImg, RequestError } = require("../../helpers");
// const avatarsDir = path.join("public", "notices");
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

  try {
    const { path } = req.file;
    const upload = await uploads(path, "Notices");
    fs.unlinkSync(path);

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
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};
module.exports = createNoticeCloud;
