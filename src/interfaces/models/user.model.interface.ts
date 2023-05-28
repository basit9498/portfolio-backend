import { Document, Model } from 'mongoose';

// These are user Attributes
export interface UserAttrs {
  name: string;
  email: string;
  password: string;
  account_status?: boolean;
  role?: string;
}

// User Model Document
export interface UserDocment extends Document {
  name: string;
  email: string;
  password: string;
  account_status?: boolean;
  role?: string;
  verify_account: {
    status: boolean;
    token?: string;
  };
  // Add methods in future if need for apply a specfic user
}

export interface UserModel extends Model<UserDocment> {
  build(userAttrs: UserAttrs): UserDocment;
  // Add methods in future if need for apply to whole user
}
