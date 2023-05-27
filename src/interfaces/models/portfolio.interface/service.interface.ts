import { Document, Model, Types } from 'mongoose';

export interface ServiceAttr {
  user_id: Types.ObjectId;
  name: string;
  time_duration: Date;
  detail: string;
  features: string;
  technology?: { name: string; experience: string; visabilty: boolean }[];
}

export interface ServiceDoc extends Document {
  user_id: Types.ObjectId;
  name: string;
  time_duration: Date;
  detail: string;
  features: string;
  technology?: { name: string; experience: string; visabilty: boolean }[];
}

export interface ServiceModel extends Model<ServiceDoc> {
  build(serviceAttr: ServiceAttr): ServiceDoc;
}
