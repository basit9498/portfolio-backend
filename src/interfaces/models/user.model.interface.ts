import { Document, Model } from 'mongoose';

export enum ActiveStatus {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}
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
  login_status: { token: string }[];
  avatar?: string;
  active_status?: ActiveStatus;
  // Add methods in future if need for apply a specific user
}

export interface UserModel extends Model<UserDocment> {
  build(userAttrs: UserAttrs): UserDocment;
  updateActiveStatus(id: string, status: ActiveStatus): boolean;
  // Add methods in future if need for apply to whole user
}
