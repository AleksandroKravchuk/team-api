const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const pets = new Schema(
  {
    photoPet: { type: String },
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      // required: [true, "Name is required"],
    },
    birth: {
      type: String,
      minlength: 2,
      maxlength: 10,
      // require: [true, "birth is required"],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 20,
      // required: [true, "Breed is required"],
    },
    comments: {
      type: String,
      minlength: 2,
      maxlength: 200,
      // required: [true, "Comments required"],
    },
    lovation: {
      type: String,
      minlength: 2,
      maxlength: 20,
      // required: [true, "Lovation required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      // required: [true, "Sex required"],
    },
    price: {
      type: Number,
      // required: [true, "Price required"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);
pets.post("save", handleSaveErrors);
const Pets = model("pets", pets);

const schemas = {
  petsValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(2).max(30).required(),
      birth: Joi.string().required(),
      breed: Joi.string().required(),
    });
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
  addPetsValidation: (req, res, next) => {
    const schema = Joi.object({
      // photoPet: Joi.string().required(),
      // comments: Joi.string().alphanum().min(5).max(300).required(),
      // lovation: Joi.string(),
      // sex: Joi.string(),
      // price: Joi.number(),
    });
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    next();
  },
};

module.exports = { Pets, schemas };
