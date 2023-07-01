import { Request } from 'express';

const searchingQuery = function (searchList: string[], req: Request) {
  const searchQuery: Record<string, any> = {};

  const getSearchKeywords = Object.keys(req.query).filter((qf) =>
    searchList.includes(qf)
  );

  getSearchKeywords.forEach((keyword) => {
    searchQuery[keyword] = req.query[keyword];
  });

  const searchResult: Record<string, any> = {};

  Object.entries(searchQuery).forEach((search) => {
    searchResult[search[0]] = { $regex: search[1], $options: 'i' };
  });

  return searchResult;
};

export default searchingQuery;
