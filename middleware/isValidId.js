const { isValidObjectId } = require("mongoose");
const { RequestError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const result = isValidObjectId(id);

  if (!result) {
    throw RequestError(404, `id ${id} is not valid`);
  }
  next();
};

module.exports = isValidId;
