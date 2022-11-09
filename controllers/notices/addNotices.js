const { Notices } = require("../../models/schemasNotices");
// const { RequestError } = require("../../helpers");

const addNotices = async (req, res) => {
  const {
    photo,
    category,
    title,
    name,
    birth,
    breed,
    price,
    sex,
    place,
    age,
    comments,
  } = req.body;
  // const { _id: owner } = req.user;
  const results = await Notices.create({
    photo,
    category,
    title,
    name,
    birth,
    breed,
    price,
    sex,
    place,
    age,
    comments,
    // owner,
  });
  res.json({
    status: "success",
    code: 200,
    data: { notice: results },
  });
};

module.exports = addNotices;
