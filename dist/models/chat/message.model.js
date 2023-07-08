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
exports.MessageModelDB = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
const MessageSchema = new mongoose_1.Schema({
    chat_room_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'ChatRoom',
    },
    sender_user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
    message: {
        type: String,
        required: true,
    },
});
exports.MessageModelDB = mongoose_1.default.model('Message', MessageSchema);
//# sourceMappingURL=message.model.js.map