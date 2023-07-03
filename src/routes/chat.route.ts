import express from 'express';
import * as ChatController from '../controllers/chat.controller';
import { isAuth } from '../middlewares/isAuth.middleare';

const route = express.Router();

/**
 * Chat Request Related
 */
route.post('/chat/request', isAuth, ChatController.chatUserRequest);
route.get('/chat/request', isAuth, ChatController.chatRequestedList);
route.put('/chat/request/:id', isAuth, ChatController.chatRequestAccept);
route.delete('/chat/request/:id', isAuth, ChatController.chatRequestReject);

/**
 * Chat Related
 */
// Remove from Group or One to One Chat or unfriend
route.delete('/chat/room/:id', isAuth, ChatController.chatLeaveRoom);

/**
 * Friend Related
 */
route.get('/chat/friend', isAuth, ChatController.chatFriendsList);

/**
 * Message Related
 */
route.post('/chat/message', isAuth, ChatController.messageSend);
route.get('/chat/message/:id', isAuth, ChatController.messageAll);

export { route as ChatRoute };
