import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  account_status: {
    type: Boolean,
    required: true,
    default: true,
  },
  role: {
    type: String,
    required: true,
    default: 'User',
  },
});

export const UserModel = mongoose.model('User', UserSchema);
