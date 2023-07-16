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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoute = void 0;
const express_1 = __importDefault(require("express"));
const ChatController = __importStar(require("../controllers/chat.controller"));
const isAuth_middleare_1 = require("../middlewares/isAuth.middleare");
const route = express_1.default.Router();
exports.ChatRoute = route;
/**
 * @swagger
 * tags:
 *  name: Chat
 *  description: API for chat
 */
/**
 * @swagger
 * /chat/request:
 *   post:
 *     tags: [Chat]
 *     summary: Send request to any user for chat
 *     requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/ChatSendRequest"
 *     responses:
 *          201:
 *              description: Request send successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: "#/components/schemas/ChatResponseData"
 *          400:
 *              description: Invalid Authorization !!!
 *
 *
 */
route.post('/chat/request', isAuth_middleare_1.isAuth, ChatController.chatUserRequest);
/**
 * @swagger
 * '/chat/message/':
 *  get:
 *    tags: [Chat]
 *    summary: Get all requests
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/MessageList'
 *      400:
 *        description: No Message List
 *
 */
route.get('/chat/request', isAuth_middleare_1.isAuth, ChatController.chatRequestedList);
route.put('/chat/request/:id', isAuth_middleare_1.isAuth, ChatController.chatRequestAccept);
route.delete('/chat/request/:id', isAuth_middleare_1.isAuth, ChatController.chatRequestReject);
route.delete('/chat/room/:id', isAuth_middleare_1.isAuth, ChatController.chatLeaveRoom);
route.get('/chat/friend', isAuth_middleare_1.isAuth, ChatController.chatFriendsList);
route.get('/chat/user', isAuth_middleare_1.isAuth, ChatController.chatUserList);
route.post('/chat/message', isAuth_middleare_1.isAuth, ChatController.messageSend);
/**
 * @swagger
 * '/chat/message/{id}':
 *  get:
 *    tags: [Chat]
 *    summary: Get Messages
 *    parameters:
 *              - name: id
 *                in: path
 *                description: The id of chat room
 *                required: true
 *    responses:
 *      200:
 *       description: Success
 *       content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/MessageList'
 *      400:
 *        description: No Message List
 *
 */
route.get('/chat/message/:id', isAuth_middleare_1.isAuth, ChatController.messageAll);
//# sourceMappingURL=chat.route.js.map