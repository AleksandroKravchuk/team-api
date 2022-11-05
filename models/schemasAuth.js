const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleSaveErrors } = require("../helpers");
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
      // enum: ["starter", "pro", "business"],
      // unique: true,
    },
    city: {
      type: String,
    },
    phone: {
      type: Number,
      // unique: true,
    },
    birthday: {
      type: Number,
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);
const User = model("users", userSchema);

const schemasAuth = {
  // userValidation: (req, res, next) => {
  //   const schema = Joi.object({
  //     password: Joi.string().alphanum().min(2).max(30).required(),
  //     email: Joi.string()
  //       .email({
  //         minDomainSegments: 2,
  //         tlds: { allow: ["com", "net", "ua"] },
  //       })
  //       .required(),

  //     birthday: Joi.number(),
  //     avatarURL: Joi.string(),
  //   });
  //   const validateUser = schema.validate(req.body);
  //   if (validateUser.error) {
  //     return res.status(400).json({ message: `${validateUser.error}` });
  //   }
  //   next();
  // },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string().alphanum().min(2).max(30).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  addInfoValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().alphanum().required(),
      city: Joi.string().alphanum().required(),
      phone: Joi.number().required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res.status(400).json({ message: `${validateLogin.error}` });
    }
    next();
  },
  // verifyEmailSchema: (req, res, next) => {
  //   const schema = Joi.object({
  //     email: Joi.string().required(),
  //   });
  //   const verifyEmail = schema.validate(req.body);
  //   if (verifyEmail.error) {
  //     return res.status(400).json({ message: "missing required field email" });
  //   }
  //   next();
  // },
};

module.exports = { User, schemasAuth };
