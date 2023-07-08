import express from 'express';
import * as ChatController from '../controllers/chat.controller';
import { isAuth } from '../middlewares/isAuth.middleare';

const route = express.Router();

//Chat Request Related----

route.post('/chat/request', isAuth, ChatController.chatUserRequest);
/**
 * @swagger
 * /chat/request:
 *  get:
 *      tags:
 *          - Request List
 *      summary: Get request list
 */
route.get('/chat/request', isAuth, ChatController.chatRequestedList);

route.put('/chat/request/:id', isAuth, ChatController.chatRequestAccept);
route.delete('/chat/request/:id', isAuth, ChatController.chatRequestReject);

route.delete('/chat/room/:id', isAuth, ChatController.chatLeaveRoom);

route.get('/chat/friend', isAuth, ChatController.chatFriendsList);
route.get('/chat/user', isAuth, ChatController.chatUserList);

route.post('/chat/message', isAuth, ChatController.messageSend);

/**
 * @swagger
 * '/chat/message/{id}':
 *  get:
 *    tags:
 *        - Message
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
route.get('/chat/message/:id', isAuth, ChatController.messageAll);

export { route as ChatRoute };
