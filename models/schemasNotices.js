const { Schema, model } = require("mongoose");
const JoiBase = require("joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);
const { handleSaveErrors } = require("../helpers");

const notices = new Schema(
  {
    photo: { type: String },
    category: {
      type: String,
      enum: ["sell", "lost-found", "in good hands"],
      required: [
        true,
        "Category is required one of sell, lost-found, in good hands",
      ],
    },
    title: {
      type: String,
      minlength: 2,
      maxlength: 100,
      required: [true, "Title is required"],
    },
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, "Name is required"],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 20,
      // default: "",
      // required: [true, "Breed is required"],
    },
    birth: {
      type: String,
      minlength: 2,
      maxlength: 20,
      // default: "",
      // required: [true, "Birth is required"],
    },
    place: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // default: "",
      // required: [true, "Place required"],
    },
    age: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // default: "",
      // required: [true, "Age required"],
    },
    favorite: [String],
    location: {
      type: String,
      minlength: 2,
      maxlength: 50,
      // required: [true, "Lovation required"],
    },
    sex: {
      type: String,
      enum: ["male", "female"],
      // default: "",
      // required: [true, "Sex required"],
    },
    price: {
      type: String,
      // default: "",
      // required: [true, "Price required"],
    },
    comments: { type: String },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "users",
      // required: true,
    },
  },

  { versionKey: false, timestamps: true }
);
notices.post("save", handleSaveErrors);
const Notices = model("notices", notices);
const schemasNotice = {
  noticeValidation: (req, res, next) => {
    const schema = Joi.object({
      title: Joi.string,
      name: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,16}")),
      birth: Joi.date().format("DD.MM.YYYY").raw().less("now"),
      breed: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,16}")),
      category: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,40}")),
    });
    const validateUser = schema.validate(req.body);
    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
  noticeAddValidation: (req, res, next) => {
    const schema = Joi.object({
      sex: Joi.string().pattern(new RegExp("^[a-z]{4,6}$")),
      location: Joi.string().pattern(new RegExp("^[a-zA-Z]{2,30}")),
      price: Joi.string().pattern(new RegExp("^[0-9]{1,4}$")),
      comments: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{2,200}")),
    });

    const validateUser = schema.validate(req.body);

    if (validateUser.error) {
      return res.status(400).json({ message: `${validateUser.error}` });
    }
    next();
  },
};

module.exports = { Notices, schemasNotice };
