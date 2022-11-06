const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { friends: ctrl } = require("../../controllers");
const { isValidId } = require("../../middleware");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getWorkTime));
// router.get("/:id", isValidId, ctrlWrapper(ctrl.getNewsById));
// router.get("/search/:value", ctrlWrapper(ctrl.getNewsBySearch));
router.post("/", ctrlWrapper(ctrl.addFriend));
// router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

// router.post(
//   "/",
//   authenticate,
//   // schemas.bodyValidation,
//   ctrlWrapper(ctrl.addContact)
// );

// router.delete(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   ctrlWrapper(ctrl.deleteContact)
// );

// router.put(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   // schemas.bodyValidation,
//   ctrlWrapper(ctrl.updateContact)
// );

// router.patch(
//   "/:contactId/favorite",
//   authenticate,
//   isValidId,
//   // schemas.favoriteValidation,
//   ctrlWrapper(ctrl.updateStatusContact)
// );

module.exports = router;
