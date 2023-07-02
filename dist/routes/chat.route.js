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
 * Chat Request Related
 */
route.post('/chat/request', isAuth_middleare_1.isAuth, ChatController.chatUserRequest);
route.get('/chat/request', isAuth_middleare_1.isAuth, ChatController.chatRequestedList);
route.put('/chat/request/:id', isAuth_middleare_1.isAuth, ChatController.chatRequestAccept);
/**
 * Chat Related
 */
// chat delete or reject the request
route.delete('/chat/:id', isAuth_middleare_1.isAuth, ChatController.chatDelete);
/**
 * Friend Related
 */
route.get('/chat/friend', isAuth_middleare_1.isAuth, ChatController.chatFriendsList);
/**
 * Message Related
 */
route.post('/chat/message', isAuth_middleare_1.isAuth, ChatController.messageSend);
route.get('/chat/message/:id', isAuth_middleare_1.isAuth, ChatController.messageAll);
//# sourceMappingURL=chat.route.js.map