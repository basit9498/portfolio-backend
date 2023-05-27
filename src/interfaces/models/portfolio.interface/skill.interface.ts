import { Document, Model, ObjectId, Types } from 'mongoose';

export interface SkillAttr {
  user_id: Types.ObjectId;
  name: string;
  experience: string;
  visibility: boolean;
}

export interface SkillDoc extends Document {
  user_id: Types.ObjectId;
  name: string;
  experience: string;
  visibility: boolean;
}

export interface SkillModel extends Model<SkillDoc> {
  build(skillAttr: SkillAttr): SkillDoc;
}
