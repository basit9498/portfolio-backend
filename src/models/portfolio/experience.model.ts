import {
  ExperienceDoc,
  ExperienceModel,
  ExperienceAttr,
} from '../../interfaces/models/portfolio.interface/experience.interface';
import mongoose, { Schema } from 'mongoose';

const ExperienceSchema = new Schema<ExperienceDoc, ExperienceModel>({
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
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
});

ExperienceSchema.statics.build = (experienceAttr: ExperienceAttr) => {
  return new PortfolioExperienceModel(experienceAttr);
};

export const PortfolioExperienceModel = mongoose.model<
  ExperienceDoc,
  ExperienceModel
>('Portfolio_Experience', ExperienceSchema);
