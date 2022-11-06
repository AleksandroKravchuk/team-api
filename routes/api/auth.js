const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { schemasAuth } = require("../../models/schemasAuth");
const { auth: ctrl, files: ctrlFs } = require("../../controllers");
const { authenticate, upload } = require("../../middleware");

router.post(
  "/register",
  schemasAuth.loginValidation,
  ctrlWrapper(ctrl.registerUser)
);
router.post("/login", schemasAuth.loginValidation, ctrlWrapper(ctrl.loginUser));
router.get("/logout", authenticate, ctrlWrapper(ctrl.logoutUser));
router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));
router.get("/", authenticate, ctrlWrapper(ctrl.getUserInformation));
router.patch(
  "/",
  authenticate,
  schemasAuth.userValidation,
  ctrlWrapper(ctrl.updateUserInformation)
);
router.patch(
  "/register/:id",
  schemasAuth.addInfoValidation,
  ctrlWrapper(ctrl.addRegisterInformation)
);

router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrlWrapper(ctrlFs.updateAvatar)
);

module.exports = router;
