import { Document, Model } from 'mongoose';

class ApiFeatures<T extends Document> {
  private model: Model<T>;
  private query;
  public documentCount: number = 0;

  constructor(model: Model<T>, query: any) {
    this.model = model;
    this.query = query;
  }

  search(searchList: string[]) {
    const searchQuery: Record<string, any> = {};

    const getSearchKeywords = Object.keys(this.query).filter((qf) =>
      searchList.includes(qf)
    );

    getSearchKeywords.forEach((keyword) => {
      searchQuery[keyword] = this.query[keyword];
    });

    const searchResult: Record<string, any> = {};

    Object.entries(searchQuery).forEach((search) => {
      searchResult[search[0]] = { $regex: search[1], $options: 'i' };
    });

    // this.documentCount = this.model.find(searchResult).countDocuments();
    this.query = this.model.find(searchResult);

    return this;
  }
  filter(filterList: string[]) {}

  async pagination(page: number, limit: number) {
    // return await this.model.limit(limit * 1).skip((page - 1) * limit);
    console.log('this.query:', this.query);
    return this.model
      .find(this.query)
      .limit(limit * 1)
      .skip((page - 1) * limit);
  }
}

export default ApiFeatures;

// Implementing api features
// const portfolioFeatures = await new ApiFeatures<IPortfolio>(
//   PortfolioModelDB,
//   req.query
// )
//   .search(['name', 'email'])
//   .pagination(2, 4);

// console.log('portfolioFeatures', portfolioFeatures);
