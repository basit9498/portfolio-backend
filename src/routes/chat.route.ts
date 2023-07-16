import express from 'express';
import * as ChatController from '../controllers/chat.controller';
import { isAuth } from '../middlewares/isAuth.middleare';

const route = express.Router();

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

route.post('/chat/request', isAuth, ChatController.chatUserRequest);
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
route.get('/chat/message/:id', isAuth, ChatController.messageAll);

export { route as ChatRoute };
