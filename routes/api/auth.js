const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { schemas } = require("../../models/schemasAuth");
const { auth: ctrl, files: ctrlFs } = require("../../controllers");
const { authenticate, upload } = require("../../middleware");

router.post(
  "/register",
  schemas.userValidation,
  ctrlWrapper(ctrl.registerUser)
);
router.post("/login", schemas.loginValidation, ctrlWrapper(ctrl.loginUser));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));
router.patch(
  "/register/:id",
  schemas.addInfoValidation,
  ctrlWrapper(ctrl.addRegisterInformation)
);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlFs.updateAvatar)
);

module.exports = router;
