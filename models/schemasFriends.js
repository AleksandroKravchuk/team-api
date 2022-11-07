const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const friends = new Schema(
  {
    name: {
      type: String,
    },
    logo: {
      type: String,
    },
    time: {
      type: String,
    },
    address: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },

  { versionKey: false, timestamps: true }
);
friends.post("save", handleSaveErrors);
const Friends = model("friends", friends);

const workTimes = new Schema(
  {
    workDays: {
      type: String,
    },
    dayOffTimes: {
      type: String,
    },
    dayOff: {
      type: String,
    },
    owner: {
      type: String,
      ref: "friends",
      required: true,
    },
  },

  { versionKey: false, timestamps: true }
);
workTimes.post("save", handleSaveErrors);
const WorkTimes = model("workTimes", workTimes);

module.exports = { Friends, WorkTimes };
