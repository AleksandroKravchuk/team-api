const express = require("express");
const { schemasNotice } = require("../../models/schemasNotices");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { notices: ctrl } = require("../../controllers");
const { authenticate, isValidId, upload } = require("../../middleware");

router.get("/:value", ctrlWrapper(ctrl.getAllNotices));
router.get("/one/:id", ctrlWrapper(ctrl.getNoticeById));

router.get("/one/owner", authenticate, ctrlWrapper(ctrl.getNoticesOwn));
router.get(
  "/one/favorite",
  // schemasNotice.noticeFavorite,
  authenticate,
  ctrlWrapper(ctrl.getFavoriteNotice)
);

router.post(
  "/",
  authenticate,
  // schemasNotice.noticeValidation,
  ctrlWrapper(ctrl.addNotices)
);

router.delete(
  "/delete/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteNotice)
);
router.patch(
  "/addfavorite/:noticeId",
  authenticate,
  // isValidId,
  // schemasNotice.noticeAddValidation,
  // upload.single("photoNotices"),
  ctrlWrapper(ctrl.addNoticeFavorite)
);
router.patch(
  "/deletefavorite/:noticeId",
  authenticate,
  // isValidId,
  // schemasNotice.noticeAddValidation,
  // upload.single("photoNotices"),
  ctrlWrapper(ctrl.deleteNoticeFavorite)
);
router.patch(
  "/:id",
  authenticate,
  isValidId,
  upload.single("photoNotices"),
  schemasNotice.noticeAddValidation,
  ctrlWrapper(ctrl.createNotice)
);

module.exports = router;
