const { Pets } = require("../../models/schemasPets");

const addPet = async (req, res) => {
  const { body } = req;
  const { _id: owner } = req.user;

  const result = await Pets.create({ ...body, owner });
  res.json({
    status: "success",
    code: 201,
    message: "Pet success created",
    data: { pet: result },
  });
};
module.exports = addPet;
