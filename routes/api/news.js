const express = require("express");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { news: ctrl } = require("../../controllers");
const { isValidId } = require("../../middleware");
router.get("/", ctrlWrapper(ctrl.getAll));
router.get("/:id", isValidId, ctrlWrapper(ctrl.getNewsById));
router.get("/search/:value", ctrlWrapper(ctrl.getNewsBySearch));
router.post("/addNews", ctrlWrapper(ctrl.addNews));

module.exports = router;
