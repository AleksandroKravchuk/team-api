const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  res.status(200).json({
    code: 200,
    status: "success",
    message: "Information found.",
    data: id,
  });
};
module.exports = getCurrentUser;
