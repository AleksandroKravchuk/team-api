const getAllNotices = require("./getAllNotices");
const addNotices = require("./addNotices");
const createNotice = require("./createNotice");
const getNoticesOwn = require("./getNoticesFavorite");
const getNoticeById = require("./getNoticeById");

module.exports = {
  getAllNotices,
  addNotices,
  createNotice,
  getNoticesOwn,
  getNoticeById,
};
