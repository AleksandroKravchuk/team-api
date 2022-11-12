const { Schema, model } = require("mongoose");

const { handleSaveErrors } = require("../helpers");

const friends = new Schema(
  {
    title: {
      type: String,
    },
    url: {
      type: String,
    },
    addressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: [Object],
    phone: {
      type: String,
    },
    email: {
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
