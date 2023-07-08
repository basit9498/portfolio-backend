import mongoose, { Schema } from 'mongoose';
/**
 * @swagger
 * components:
 *  schemas:
 *    MessageList:
 *     type: object
 *     required:
 *        - chat_room_id
 *        - message
 *     properties:
 *        chat_room_id:
 *          type: string
 *        message:
 *          type: string
 *        sender_user_id:
 *          type: string
 *
 *
 */
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
