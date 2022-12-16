const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { schemasAuth } = require("../../models/schemasAuth");
const { auth: ctrl, files: ctrlFs } = require("../../controllers");
const { authenticate, upload } = require("../../middleware");

router.post(
  "/register",
  schemasAuth.userRegister,
  ctrlWrapper(ctrl.registerUser)
);
router.post("/login", schemasAuth.loginValidation, ctrlWrapper(ctrl.loginUser));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

// router.patch(
//   "/register/:id",
//   isValidId,
//   schemasAuth.addInfoValidation,
//   ctrlWrapper(ctrl.addRegisterInformation)
// );

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlFs.updateAvatarCloud)
);

module.exports = router;
