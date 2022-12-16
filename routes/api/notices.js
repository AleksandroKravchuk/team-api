const express = require("express");
const { schemasNotice } = require("../../models/schemasNotices");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { notices: ctrl } = require("../../controllers");
const {
  authenticate,
  isValidId,
  upload,
  uploader,
} = require("../../middleware");

router.get("/:value", ctrlWrapper(ctrl.getAllNotices));
router.get("/one/:id", ctrlWrapper(ctrl.getNoticeById));
router.get("/search/:value", ctrlWrapper(ctrl.getNoticeBySearch));
router.get("/find/owner", authenticate, ctrlWrapper(ctrl.getNoticesOwn));
router.get("/find/favorite", authenticate, ctrlWrapper(ctrl.getFavoriteNotice));

router.post(
  "/",
  authenticate,
  // uploader.single("photoNotices"),
  upload.single("photoNotices"),
  schemasNotice.noticeAddValidation,
  ctrlWrapper(ctrl.createNoticeCloud)
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
  ctrlWrapper(ctrl.addNoticeFavorite)
);
router.patch(
  "/deletefavorite/:noticeId",
  authenticate,
  ctrlWrapper(ctrl.deleteNoticeFavorite)
);
router.post(
  "/upload-images",
  authenticate,
  uploader.array("image"),
  ctrlWrapper(ctrl.addPhoto)
);

module.exports = router;
