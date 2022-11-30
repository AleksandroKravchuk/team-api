const getAllNotices = require("./getAllNotices");
const createNotice = require("./createNotice");
const getNoticesOwn = require("./getNoticesOwner");
const getNoticeById = require("./getNoticeById");
const addNoticeFavorite = require("./addNoticeFavorite");
const getFavoriteNotice = require("./getFavoriteNotice");
const deleteNoticeFavorite = require("./deleteNoticeFavorite");
const deleteNotice = require("./deleteNotice");
const getNoticeBySearch = require("./getNoticesBySearch");
const addPhoto = require("./addPhoto");
const createNoticeCloud = require("./createNoticeCloud");

module.exports = {
  getAllNotices,
  createNotice,
  getNoticesOwn,
  getNoticeById,
  addNoticeFavorite,
  getFavoriteNotice,
  deleteNoticeFavorite,
  deleteNotice,
  getNoticeBySearch,
  addPhoto,
  createNoticeCloud,
};
