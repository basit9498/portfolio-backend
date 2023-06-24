import {
  Experiences,
  IPortfolio,
  PortfolioAttr,
  Projects,
  Services,
  Skills,
  SocialLinks,
} from '../interfaces/models/portfolio.model.interface';
import mongoose, { HydratedDocument, Model, Schema, Types } from 'mongoose';

// Methods
interface IPortfolioMethods {}
// Statics
interface PortfolioModel extends Model<IPortfolio, {}, IPortfolioMethods> {
  build(
    portfolioAttr: PortfolioAttr
  ): Promise<HydratedDocument<IPortfolio, IPortfolioMethods>>;
}

// SocialLinks Schema
const SocialLinkSchema = new Schema<SocialLinks>({
  name: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Skills Schema
const SkillSchema = new Schema<Skills>({
  name: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Experiences Schema
const ExperienceSchema = new Schema<Experiences>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  from_data: {
    type: Date,
    required: true,
  },
  to_date: {
    type: Date,
    required: true,
  },
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Projects Schema
const ProjectSchema = new Schema<Projects>({
  name: {
    type: String,
    required: true,
  },
  type: [
    {
      type: String,
      required: true,
    },
  ],
  platform: [
    {
      type: String,
      required: true,
    },
  ],
  link: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// Services Schema
const ServiceSchema = new Schema<Services>({
  name: {
    type: String,
    required: true,
  },
  time_duration: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
    required: true,
  },
  features: {
    type: String,
    required: true,
  },
  technology: [
    {
      name: {
        type: String,
        required: true,
      },
      experience: {
        type: String,
        required: true,
      },
    },
  ],
  visibility: {
    type: Boolean,
    required: true,
    default: true,
  },
});

// PortfolioSchema
const PortfolioSchema = new Schema<
  IPortfolio,
  PortfolioModel,
  IPortfolioMethods
>({
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
  social_links: [SocialLinkSchema],
  skills: [SkillSchema],
  experiences: [ExperienceSchema],
  projects: [ProjectSchema],
  services: [ServiceSchema],
});

// Define Static Methods
PortfolioSchema.static('build', function build(portfolioAttr: PortfolioAttr) {
  // return new PortfolioModelDB(portfolioAttr);
  return this.create(portfolioAttr);
});

export const PortfolioModelDB = mongoose.model<IPortfolio, PortfolioModel>(
  'Portfolio',
  PortfolioSchema
);
