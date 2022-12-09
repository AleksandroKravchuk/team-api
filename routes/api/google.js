const express = require("express");
const router = express.Router();
const { ctrlWrapper } = require("../../helpers");
// const { schemasAuth } = require("../../models/schemasAuth");
const { googleAuth, googleRedirect } = require("../../controllers");
// const { authenticate, upload } = require("../../middleware");

router.get("/google", ctrlWrapper(googleAuth));
router.get("/google-redirect", ctrlWrapper(googleRedirect));

module.exports = router;
