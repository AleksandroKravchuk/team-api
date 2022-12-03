const Jimp = require("jimp");
const RequestError = require("./RequestError");

function configImg({
  tempUpload,
  filename,
  avatarsDir,
  width = 300,
  height = 300,
  quality,
}) {
  Jimp.read(tempUpload)
    .then((image) => {
      image
        .resize(width, height)
        .write(`${avatarsDir}/${filename}`)
        .quality(quality)
        .rotate(90); // save
      // Do stuff with the image.
    })
    .catch(() => {
      throw RequestError(400, "Filed format file");
      // Handle an exception.
    });
}
module.exports = configImg;
