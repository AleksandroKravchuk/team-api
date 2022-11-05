const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const news = new Schema(
  {
    title: {
      type: String,
      // minlength: 2,
      // maxlength: 20,
      required: [true, "Title is required"],
    },
    text: {
      type: String,
      // minlength: 2,
      // maxlength: 20,
      required: [true, "Text is required"],
      unique: true,
    },
    date: {
      type: String,
      // minlength: 2,
      // maxlength: 200,
      required: [true, "Comments required"],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
  },

  { versionKey: false, timestamps: true }
);
news.post("save", handleSaveErrors);
const News = model("news", news);

module.exports = { News };
