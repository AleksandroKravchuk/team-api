const express = require("express");
const { schemasNotice } = require("../../models/schemasNotices");
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
  // schemasNotice.noticeValidation,
  ctrlWrapper(ctrl.addNotices)
);

// router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deletePet));

router.patch(
  "/:id",
  // authenticate,
  isValidId,
  schemasNotice.noticeAddValidation,
  upload.single("photoNotices"),
  ctrlWrapper(ctrl.createNotice)
);
router.patch(
  "/:id/favorite",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.changeFavorite)
);
router.delete(
  "/:id/favorite",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeFavorite)
);

router.delete(
  "/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.removeNoticeById)
);
router.get(
  "/owner/favorite",
  authenticate,
  ctrlWrapper(ctrl.getFavoriteNotice)
);

module.exports = router;
