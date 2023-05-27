import {
  ProjectDoc,
  ProjectAttr,
  ProjectModel,
} from '../../interfaces/models/portfolio.interface/project.interface';
import mongoose, { Schema } from 'mongoose';

const ProjectSchema = new Schema<ProjectDoc, ProjectModel>({
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
  visabilty: {
    type: Boolean,
    required: true,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
  },
});

ProjectSchema.statics.build = (projectAttr: ProjectAttr) => {
  return new PortfolioProjectModel(projectAttr);
};

export const PortfolioProjectModel = mongoose.model<ProjectDoc, ProjectModel>(
  'Portfolio_Project',
  ProjectSchema
);
