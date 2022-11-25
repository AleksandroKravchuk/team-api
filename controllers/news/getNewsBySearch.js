const { News } = require("../../models/schemasNews");
const { RequestError } = require("../../helpers");

const getNewsBySearch = async (req, res) => {
  const { value } = req.params;
  const result = await News.find();
  let searchResult = [];
  if (!result || result.length === 0) {
    throw RequestError(404, `Not found news `);
  } else {
    result.map((item) => {
      const titleArray = item.title.split(" ");
      for (let i = 0; i < titleArray.length; i += 1) {
        const titleWord = titleArray[i].toLowerCase();
        console.log(titleWord);
        if (titleWord.includes(value.toLowerCase())) {
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
      data: { news: searchResult },
    });
  }
};
module.exports = getNewsBySearch;
