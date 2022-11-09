const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const notices = new Schema(
  {
    photo: { type: String },
    category: {
      type: String,
      unique: true,
      enum: ["sell", "lost-found", "in good hands"],
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
      required: [true, "Breed is required"],
    },
    birth: {
      type: String,
      minlength: 2,
      maxlength: 20,
      required: [true, "Birth is required"],
    },
    place: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // required: [true, "Place required"],
    },
    age: {
      type: String,
      minlength: 2,
      maxlength: 30,
      // required: [true, "Age required"],
    },
    favorite: {
      type: Boolean,
      minlength: 2,
      maxlength: 30,
      default: false,
      // required: [true, "Favorite required"],
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
      type: String,
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
notices.post("save", handleSaveErrors);
const Notices = model("notices", notices);

module.exports = { Notices };
