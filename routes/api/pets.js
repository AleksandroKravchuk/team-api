const express = require("express");
const { schemas } = require("../../models/schemasPets");
const { ctrlWrapper } = require("../../helpers");
const router = express.Router();
const { pets: ctrl } = require("../../controllers");
const { authenticate, isValidId, upload } = require("../../middleware");

router.get("/", authenticate, ctrlWrapper(ctrl.getAllPets));

// router.get("/:contactId", authenticate, ctrlWrapper(ctrl.getById));

router.post(
  "/",
  authenticate,
  schemas.petsValidation,
  ctrlWrapper(ctrl.addPet)
);

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deletePet));

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
  schemas.addPetsValidation,
  upload.single("photoPet"),
  ctrlWrapper(ctrl.addPetInfo)
);

module.exports = router;
