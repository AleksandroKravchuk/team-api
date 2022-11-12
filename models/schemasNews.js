const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const news = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    url: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);
news.post("save", handleSaveErrors);
const News = model("news", news);

module.exports = { News };
