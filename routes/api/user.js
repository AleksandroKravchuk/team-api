const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
const { schemasAuth } = require("../../models/schemasAuth");
const { auth: ctrl } = require("../../controllers");
const { authenticate } = require("../../middleware");

router.get("/", authenticate, ctrlWrapper(ctrl.getUserInformation));
router.patch(
  "/update",
  authenticate,
  schemasAuth.userValidation,
  ctrlWrapper(ctrl.updateUserInformation)
);

module.exports = router;
