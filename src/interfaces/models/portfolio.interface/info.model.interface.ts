import { Document, Model, ObjectId } from 'mongoose';

interface SocialLinks {
  platform_name: string;
  link: string;
  visabilty: boolean;
}
export interface PortfolioInfoAttrs {
  name: string;
  email: string;
  contact: string;
  social_links?: SocialLinks[];
}

//
export interface PortfolioInfoDoc extends Document {
  name: string;
  email: string;
  contact: string;
  social_links?: SocialLinks[];
}

export interface PortfolioInfoModel extends Model<PortfolioInfoDoc> {
  build(portfolioInfoAttrs: PortfolioInfoAttrs): PortfolioInfoDoc;
}
