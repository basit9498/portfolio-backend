import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema({
  chat_room_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'ChatRoom',
  },
  sender_user_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  message: {
    type: String,
    required: true,
  },
});

export const MessageModelDB = mongoose.model('Message', MessageSchema);
