import {
  ServiceDoc,
  ServiceModel,
  ServiceAttr,
} from '../../interfaces/models/portfolio.interface/service.interface';
import mongoose, { Schema } from 'mongoose';

const ServiceSchema = new Schema<ServiceDoc, ServiceModel>({
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
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Portfolio',
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
      visabilty: {
        type: Boolean,
        required: true,
        default: true,
      },
    },
  ],
});

ServiceSchema.statics.build = (serviceAttr: ServiceAttr) => {
  return new PortfolioServiceModel(serviceAttr);
};

export const PortfolioServiceModel = mongoose.model<ServiceDoc, ServiceModel>(
  'Portfolio_Service',
  ServiceSchema
);
