const { Notices } = require("../../models/schemasNotices");
// const { RequestError } = require("../../helpers");

const addNotices = async (req, res) => {
  const { category, title, name, birth, breed } = req.body;
  const { _id: owner } = req.user;
  const results = await Notices.create({
    category,
    title,
    name,
    birth,
    breed,
    owner,
  });
  res.json({
    status: "success",
    code: 200,
    data: { notice: results },
  });
};

module.exports = addNotices;
