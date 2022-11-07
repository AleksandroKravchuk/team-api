const { WorkTimes } = require("../../models/schemasFriends");
const { RequestError } = require("../../helpers");

const getWorkTime = async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  // eslint-disable-next-line no-undef
  const owner = `ObjectId('${id}')`;
  const results = await WorkTimes.find({ owner });
  if (!results || results.length === 0) {
    throw RequestError(404, `Not found workTime by id:${id}.`);
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      workTimes: results,
    },
  });
};
module.exports = getWorkTime;
