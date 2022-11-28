const { Schema, model } = require("mongoose");
const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { handleSaveErrors } = require("../helpers");

const pets = new Schema(
  {
    photoPet: { type: String },
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    birth: {
      type: String,
      minlength: 2,
      maxlength: 10,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    comments: {
      type: String,
      minlength: 2,
      maxlength: 200,
    },
    lovation: {
      type: String,
      minlength: 2,
      maxlength: 20,
    },
    sex: {
      type: String,
      enum: ["male", "female"],
    },
    price: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
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
      birth: Joi.date().format("DD.MM.YYYY").raw().less("now").required(),
      breed: Joi.string().required(),
      comments: Joi.string(),
    });
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      return res.status(400).json({ message: `${validateBody.error}` });
    }
    next();
  },
};

module.exports = { Pets, schemas };
