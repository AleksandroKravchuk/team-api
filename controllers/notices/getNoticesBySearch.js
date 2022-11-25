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
        // console.log(titleWord);
        // console.log(value.toLowerCase());
        if (titleWord.includes(value.toLowerCase())) {
          console.log(item);
          const res = searchResult.push(item);
          console.log(res);
          // return res;
        }
      }
    });
    if (searchResult.length === 0) {
      throw RequestError(404, `Not found news with title ${value}`);
    }
    res.json({
      status: "success",
      code: 200,
      data: { news: searchResult },
    });
  }
};
module.exports = getNoticeBySearch;
