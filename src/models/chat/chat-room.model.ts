import mongoose, { Schema } from 'mongoose';

const ChatRoomSchema = new Schema({
  chat_room: {
    type: String,
    required: true,
    enum: {
      values: ['ONE-TO-ONE', 'GROUP'],
      message: `{VALUE} is not supported`,
    },
  },
  users: [
    {
      user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
      accept_status: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
  ],
  is_group: {
    type: Boolean,
    default: false,
  },
  group_admin_users: [
    {
      id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User',
      },
    },
  ],
});

export const ChatRoomModelDB = mongoose.model('ChatRoom', ChatRoomSchema);
