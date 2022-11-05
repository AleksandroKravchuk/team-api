const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const friends = new Schema(
  {
    name: {
      type: String,
      // minlength: 2,
      // maxlength: 20,
      //   required: [true, "Title is required"],
    },
    logo: {
      type: String,
      // minlength: 2,
      // maxlength: 20,
      //   required: [true, "Title is required"],
    },
    time: {
      type: Array,
      // minlength: 2,
      // maxlength: 20,
      //   required: [true, "Text is required"],
      //   unique: true,
    },
    address: {
      type: String,
      // minlength: 2,
      // maxlength: 200,
      //   required: [true, "Comments required"],
    },
    email: {
      type: String,
      // minlength: 2,
      // maxlength: 200,
      //   required: [true, "Comments required"],
    },
    phone: {
      type: String,
      // minlength: 2,
      // maxlength: 200,
      //   required: [true, "Comments required"],
    },
    // owner: {
    //   type: Schema.Types.ObjectId,
    //   ref: "users",
    //   required: true,
    // },
  },

  { versionKey: false, timestamps: true }
);
friends.post("save", handleSaveErrors);
const Friends = model("friends", friends);

module.exports = { Friends };
