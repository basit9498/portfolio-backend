import {
  SkillAttr,
  SkillDoc,
  SkillModel,
} from '../../interfaces/models/portfolio.interface/skill.interface';
import mongoose, { Schema, Types } from 'mongoose';

const SkillSchema = new Schema<SkillDoc, SkillModel>({
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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
});

SkillSchema.statics.build = (skillAttr: SkillAttr): SkillDoc => {
  return new PortfolioSkillModel(skillAttr);
};

export const PortfolioSkillModel = mongoose.model<SkillDoc, SkillModel>(
  'Portfolio_Skills',
  SkillSchema
);
