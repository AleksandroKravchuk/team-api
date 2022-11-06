const { Pets } = require("../../models/schemasPets");

const getAllPets = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 5 } = req.query;
  const skip = (page - 1) * limit;
  // if (favorite === null) {

  const results = await Pets.find({ owner }, "", {
    skip,
    limit,
  });

  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      pets: {
        photoPet: results.photoPet,
        name: results.name,
        birth: results.birth,
        breed: results.breed,
        comments: results.comments,
      },
    },
  });
  // } else {
  //   const results = await Pets.find({ owner, favorite }, "", {
  //     skip,
  //     limit,
  //   }).populate("owner", "email");
  //   res.json({
  //     status: "success",
  //     code: 200,
  //     data: {
  //       pets: results,
  //     },
  //   });
  // }
};
module.exports = getAllPets;
