import {
  PortfolioInfoDoc,
  PortfolioInfoModel,
  PortfolioInfoAttrs,
} from '../../interfaces/models/portfolio.interface/info.model.interface';
import mongoose, { Schema } from 'mongoose';

const PortfolioInfoSchema = new Schema<PortfolioInfoDoc, PortfolioInfoModel>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  social_links: [
    {
      platform_name: {
        type: String,
        required: true,
      },
      link: {
        type: String,
        required: true,
      },
      visabilty: {
        type: Boolean,
        required: true,
      },
    },
  ],
});

PortfolioInfoSchema.statics.build = (
  portfolioInfoAttrs: PortfolioInfoAttrs
) => {
  return new PortfolioInfo(portfolioInfoAttrs);
};

// Model Functions
export const PortfolioInfo = mongoose.model<
  PortfolioInfoDoc,
  PortfolioInfoModel
>('Portfolio', PortfolioInfoSchema);
