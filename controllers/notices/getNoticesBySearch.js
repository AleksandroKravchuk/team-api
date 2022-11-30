const { Notices } = require("../../models/schemasNotices");
const { RequestError } = require("../../helpers");

const getNoticeBySearch = async (req, res) => {
  const { value } = req.params;
  const result = await Notices.find();
  const searchResult = [];
  if (!result || result.length === 0) {
    throw RequestError(404, "Not found notices");
  } else {
    const newResult = result.filter((item) => item.title);
    newResult.map((item) => {
      const titleArray = item.title.split(" ");
      for (let i = 0; i < titleArray.length; i += 1) {
        const titleWord = titleArray[i].toLowerCase();
        if (titleWord.trim().includes(value.toLowerCase())) {
          const res = searchResult.push(item);
          return res;
        }
      }
    });
    if (searchResult.length === 0) {
      throw RequestError(404, `Not found news with title ${value}`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { notices: searchResult },
    });
  }
};
module.exports = getNoticeBySearch;
