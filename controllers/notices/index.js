const getAllNotices = require("./getAllNotices");
const addNotices = require("./addNotices");
const createNotice = require("./createNotice");
const getNoticesOwn = require("./getNoticesOwner");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const getFavoriteNotice = require("./getFavoriteNotice");

module.exports = {
  getAllNotices,
  addNotices,
  createNotice,
  getNoticesOwn,
  getNoticeById,
  addNoticeFavorite,
  getFavoriteNotice,
};
