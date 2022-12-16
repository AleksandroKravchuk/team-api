const express = require("express");
const { schemas } = require("../../models/schemasPets");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { pets: ctrl } = require("../../controllers");
const { authenticate, isValidId, upload } = require("../../middleware");

router.get("/", authenticate, ctrlWrapper(ctrl.getAllPets));

router.post(
  "/add",
  authenticate,
  upload.single("photoPet"),
  schemas.petsValidation,
  ctrlWrapper(ctrl.addPetInfoCloud)
);

router.delete(
  "/delete/:id",
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deletePet)
);

module.exports = router;
