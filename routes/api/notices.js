const express = require("express");
// const { schemas } = require("../../models/schemasNotices");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { notices: ctrl } = require("../../controllers");
const { authenticate, isValidId, upload } = require("../../middleware");

router.get("/:value", ctrlWrapper(ctrl.getAllNotices));
router.get("/one/:id", ctrlWrapper(ctrl.getNoticeById));

router.get("/owner/own", authenticate, ctrlWrapper(ctrl.getNoticesOwn));
// router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  //   schemas.petsValidation,
  ctrlWrapper(ctrl.addNotices)
);

// router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deletePet));

// router.put(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   // schemas.bodyValidation,
//   ctrlWrapper(ctrl.updateContact)
// );

router.patch(
  "/:id",
  // authenticate,
  isValidId,
  // schemas.addPetsValidation,
  upload.single("photoNotices"),
  ctrlWrapper(ctrl.createNotice)
);

module.exports = router;
