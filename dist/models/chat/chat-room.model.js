"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomModelDB = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
const ChatRoomSchema = new mongoose_1.Schema({
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
                type: mongoose_1.Schema.Types.ObjectId,
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
                type: mongoose_1.Schema.Types.ObjectId,
                required: true,
                ref: 'User',
            },
        },
    ],
});
exports.ChatRoomModelDB = mongoose_1.default.model('ChatRoom', ChatRoomSchema);
//# sourceMappingURL=chat-room.model.js.map