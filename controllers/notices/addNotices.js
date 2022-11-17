const { Notices } = require("../../models/schemasNotices");
// const { RequestError } = require("../../helpers");

const addNotices = async (req, res) => {
  const { body } = req;
  const { email: owner } = req.user;
  const results = await Notices.create({
    ...body,
    owner,
  });
  res.json({
    status: "success",
    code: 200,
    message: "Notice crested",
    data: { notice: results },
  });
};

module.exports = addNotices;
