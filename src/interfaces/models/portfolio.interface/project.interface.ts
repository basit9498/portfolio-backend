import { Document, Model, Types } from 'mongoose';

export interface ProjectAttr {
  user_id: Types.ObjectId;
  name: string;
  type: string[];
  platform: string[];
  link: string;
  visabilty: boolean;
}

export interface ProjectDoc extends Document {
  user_id: Types.ObjectId;
  name: string;
  type: string[];
  platform: string[];
  link: string;
  visabilty: boolean;
}

export interface ProjectModel extends Model<ProjectDoc> {
  build(projectAttr: ProjectAttr): ProjectDoc;
}
