"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiFeatures {
    constructor(model, query) {
        this.documentCount = 0;
        this.model = model;
        this.query = query;
    }
    search(searchList) {
        const searchQuery = {};
        const getSearchKeywords = Object.keys(this.query).filter((qf) => searchList.includes(qf));
        getSearchKeywords.forEach((keyword) => {
            searchQuery[keyword] = this.query[keyword];
        });
        const searchResult = {};
        Object.entries(searchQuery).forEach((search) => {
            searchResult[search[0]] = { $regex: search[1], $options: 'i' };
        });
        // this.documentCount = this.model.find(searchResult).countDocuments();
        this.query = this.model.find(searchResult);
        return this;
    }
    filter(filterList) { }
    async pagination(page, limit) {
        // return await this.model.limit(limit * 1).skip((page - 1) * limit);
        console.log('this.query:', this.query);
        return this.model
            .find(this.query)
            .limit(limit * 1)
            .skip((page - 1) * limit);
    }
}
exports.default = ApiFeatures;
// Implementing api features
// const portfolioFeatures = await new ApiFeatures<IPortfolio>(
//   PortfolioModelDB,
//   req.query
// )
//   .search(['name', 'email'])
//   .pagination(2, 4);
// console.log('portfolioFeatures', portfolioFeatures);
//# sourceMappingURL=apiFeatures.js.map