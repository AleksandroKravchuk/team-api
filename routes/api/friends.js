const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { friends: ctrl } = require("../../controllers");
const { isValidId } = require("../../middleware");

router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getWorkTime));
// router.get("/:id", isValidId, ctrlWrapper(ctrl.getNewsById));
router.post("/", ctrlWrapper(ctrl.addFriend));

module.exports = router;
