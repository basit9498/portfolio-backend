"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchingQuery = function (searchList, req) {
    const searchQuery = {};
    const getSearchKeywords = Object.keys(req.query).filter((qf) => searchList.includes(qf));
    getSearchKeywords.forEach((keyword) => {
        searchQuery[keyword] = req.query[keyword];
    });
    const searchResult = {};
    Object.entries(searchQuery).forEach((search) => {
        searchResult[search[0]] = { $regex: search[1], $options: 'i' };
    });
    return searchResult;
};
exports.default = searchingQuery;
//# sourceMappingURL=searchingQuery.js.map