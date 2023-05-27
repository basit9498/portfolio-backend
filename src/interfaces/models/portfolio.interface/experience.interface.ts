import { Document, Model, Types } from 'mongoose';

export interface ExperienceAttr {
  user_id: Types.ObjectId;
  name: string;
  role: string;
  detail: string;
  from_data: Date;
  to_date: Date;
  visibility: boolean;
}
export interface ExperienceDoc extends Document {
  user_id: Types.ObjectId;
  name: string;
  role: string;
  detail: string;
  from_data: Date;
  to_date: Date;
  visibility: boolean;
}
export interface ExperienceModel extends Model<ExperienceDoc> {
  build(experienceAttr: ExperienceAttr): ExperienceDoc;
}
