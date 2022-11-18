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
  schemas.petsValidation,
  ctrlWrapper(ctrl.addPet)
);

// router.delete(
//   "/delete/:id",
//   authenticate,
//   isValidId,
//   ctrlWrapper(ctrl.deletePet)
// );

// router.put(
//   "/:contactId",
//   authenticate,
//   isValidId,
//   // schemas.bodyValidation,
//   ctrlWrapper(ctrl.updateContact)
// );

router.patch(
  "/:id",
  authenticate,
  isValidId,
  upload.single("photoPet"),
  // schemas.addPetsValidation,
  ctrlWrapper(ctrl.addPetInfo)
);

module.exports = router;
