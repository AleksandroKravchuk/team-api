const { Notices } = require("../../models/schemasNotices");
// const { RequestError } = require("../../helpers");

const addNotices = async (req, res) => {
  const { photo, category, title, breed, place, age, price } = req.body;

  const results = await Notices.create({
    photo,
    category,
    title,
    breed,
    place,
    age,
    price,
  });
  res.json({
    status: "success",
    code: 200,
    data: { notices: results },
  });
};

module.exports = addNotices;
