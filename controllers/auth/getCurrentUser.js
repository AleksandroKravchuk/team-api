const getCurrentUser = async (req, res) => {
  const { email } = req.user;
  res.status(200).json({
    code: 200,
    status: "success",
    message: "	Information found.",
    data: { email },
  });
};
module.exports = getCurrentUser;
