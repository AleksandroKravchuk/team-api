const { date } = require("joi");
const { Schema, model } = require("mongoose");
// const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");

const pets = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Name is required"],
    },
    birth: {
      type: Date,
      minlength: 2,
      maxlength: 30,
      unique: true,
      require: [true, "birth is required"],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Breed is required"],
      unique: true,
    },
    comments: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: [true, "Comments required"],
    },
    lovation: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Lovation required"],
    },
    sex: {
      type: String,
      // enum: [],
      required: [true, "Sex required"],
    },
    price: {
      type: Number,
      required: [true, "Price required"],
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

// const schemas = {
//   bodyValidation: (req, res, next) => {
//     const schema = Joi.object({
//       name: Joi.string().alphanum().min(2).max(30).required(),
//       email: Joi.string()
//         .email({
//           minDomainSegments: 2,
//           tlds: { allow: ["com", "net", "ua"] },
//         })
//         .required(),
//       phone: Joi.string().alphanum().min(5).max(20).required(),
//       favorite: Joi.boolean(),
//     });
//     const validateBody = schema.validate(req.body);
//     if (validateBody.error) {
//       return res.status(400).json({ message: "missing required name field" });
//     }
//     next();
//   },
//   favoriteValidation: (req, res, next) => {
//     const schema = Joi.object({
//       favorite: Joi.boolean().required(),
//     });
//     const validatePutBody = schema.validate(req.body);
//     if (validatePutBody.error) {
//       return res.status(400).json({ message: "missing field favorite" });
//     }
//     next();
//   },
// };

module.exports = { Pets };
