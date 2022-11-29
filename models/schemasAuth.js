const { Schema, model } = require("mongoose");
const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { handleSaveErrors } = require("../helpers");
const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: 7,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    name: {
      type: String,
    },
    city: {
      type: String,
    },
    phone: {
      type: String,
      // unique: true,
    },
    birthday: {
      type: String,
      default: "00.00.0000",
    },
    avatarURL: {
      type: String,
      // required: true,
    },
    isId: {
      type: String,
      // required: true,
    },
    token: String,
    // notices: [{ type: Schema.Types.ObjectId, ref: "Notices" }],
  },

  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleSaveErrors);
const User = model("users", userSchema);

const schemasAuth = {
  userValidation: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,30}")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      }),
      birthday: Joi.date().format("DD.MM.YYYY").raw().less("now"),
      phone: Joi.string().regex(new RegExp("^[0-9]{12}$")),
      city: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,50}")),
    });
    const validateUser = schema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
  userRegister: (req, res, next) => {
    const schema = Joi.object({
      name: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,30}")),
      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net", "ua"] },
      }),
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{7,32}$"))
        .required(),
      phone: Joi.string().regex(new RegExp("^[0-9]{12}$")),
      city: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,50}")),
    });
    const validateUser = schema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
  loginValidation: (req, res, next) => {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{7,32}$"))
        .required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net", "ua"] },
        })
        .required(),
    });
    const validateLogin = schema.validate(req.body);
    if (validateLogin.error) {
      return res
        .status(400)
        .json({ status: "error", message: `${validateLogin.error}` });
    }
    next();
  },
};

module.exports = { User, schemasAuth };
