import mongoose, { Schema } from 'mongoose';

/**
 * @swagger
 * components:
 *  schemas:
 *    ChatSendRequest:
 *      type: object
 *      required:
 *        - requested_user_id
 *      properties:
 *          requested_user_id:
 *              type: string
 *              default: null
 *    ChatResponseData:
 *        type: object
 *        properties:
 *            chat_room:
 *                type: string
 *                enum: ['ONE-TO-ONE', 'GROUP']
 *            users:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/UserChatInfo"
 *            is_group:
 *                type: boolean
 *            group_admin_users:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/User"
 *
 *    UserChatInfo:
 *        type: object
 *        properties:
 *            user_id:
 *                type: string
 *                format: uuid
 *            accept_status:
 *                type: boolean
 *        required:
 *            - user_id:
 *            - accept_status:
 *    User:
 *        type: object
 *        properties:
 *            id:
 *                type: string
 *                format: uuid
 *        required:
 *            - id:
 *
 */
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
