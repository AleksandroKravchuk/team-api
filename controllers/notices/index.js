const getAllNotices = require("./getAllNotices");
const addNotices = require("./addNotices");
const createNotice = require("./createNotice");
const getNoticesOwn = require("./getNoticesFavorite");
const getNoticeById = require("./getNoticeById");
const removeNoticeById = require("./removeNoticeById");
const changeFavorite = require("./addNoticeCategory");
const removeFavorite = require("./removeNoticeCategory");
const getFavoriteNotice = require("./getFavoriteNotice");

module.exports = {
  getAllNotices,
  addNotices,
  createNotice,
  getNoticesOwn,
  getNoticeById,
  removeNoticeById,
  changeFavorite,
  removeFavorite,
  getFavoriteNotice,
};
