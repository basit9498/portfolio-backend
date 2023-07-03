"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageAll = exports.messageSend = exports.chatFriendsList = exports.chatRequestReject = exports.chatRequestAccept = exports.chatRequestedList = exports.chatUserRequest = exports.chatLeaveRoom = void 0;
const chat_room_model_1 = require("../models/chat/chat-room.model");
const responseSend_1 = require("../helpers/responseSend");
const message_model_1 = require("../models/chat/message.model");
const bad_request_1 = require("../error/bad-request");
const db_config_1 = __importDefault(require("../config/db.config"));
/**
 * Chat  Portion
 */
const chatLeaveRoom = async (req, res, next) => {
    try {
        const { id } = req.params;
        // transaction
        // leave chatRoom
        const connection = await (0, db_config_1.default)();
        const session = await connection.startSession();
        session.startTransaction();
        const chatRoom = await chat_room_model_1.ChatRoomModelDB.deleteOne({
            _id: id,
            users: { $elemMatch: { user_id: req.user.id } },
        }, { session });
        if (chatRoom.deletedCount === 0) {
            await session.abortTransaction();
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded);
        }
        // delete the messages as well
        const chatMessage = await message_model_1.MessageModelDB.deleteMany({ chat_room_id: id }, { session });
        if (chatMessage.deletedCount === 0) {
            await session.abortTransaction();
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded);
        }
        await session.commitTransaction();
        session.endSession();
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Delete);
    }
    catch (error) {
        next(error);
    }
};
exports.chatLeaveRoom = chatLeaveRoom;
/**
 * Request Portion
 */
// Request
const chatUserRequest = async (req, res, next) => {
    try {
        const { requested_user_id } = req.body;
        /**
         * See many condition
         * 1- if the request already send then throw Message
         */
        const chat = await new chat_room_model_1.ChatRoomModelDB({
            chat_room: 'ONE-TO-ONE',
            users: [
                { user_id: req.user.id, accept_status: true },
                { user_id: requested_user_id, accept_status: false },
            ],
        });
        await chat.save();
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.Created, chat);
    }
    catch (error) { }
};
exports.chatUserRequest = chatUserRequest;
// Request List
const chatRequestedList = async (req, res, next) => {
    try {
        const chat = await chat_room_model_1.ChatRoomModelDB.find({
            users: { $elemMatch: { user_id: req.user.id, accept_status: false } },
        });
        if (!chat.length) {
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.RequestNotFound);
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Read, chat);
    }
    catch (error) {
        next(error);
    }
};
exports.chatRequestedList = chatRequestedList;
//  Request accept
const chatRequestAccept = async (req, res, next) => {
    try {
        const { id } = req.params;
        const chat = await chat_room_model_1.ChatRoomModelDB.updateOne({ _id: id }, {
            $set: { 'users.$[elem].accept_status': true },
        }, {
            arrayFilters: [{ 'elem.user_id': req.user.id }],
        });
        if (chat.modifiedCount === 0) {
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded);
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Updated);
    }
    catch (error) {
        next(error);
    }
};
exports.chatRequestAccept = chatRequestAccept;
//Request Reject
const chatRequestReject = async (req, res, next) => {
    try {
        const { id } = req.params;
        const chat = await chat_room_model_1.ChatRoomModelDB.deleteOne({
            _id: id,
            users: { $elemMatch: { user_id: req.user.id } },
        });
        if (chat.deletedCount === 0) {
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded);
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Delete);
    }
    catch (error) {
        next(error);
    }
};
exports.chatRequestReject = chatRequestReject;
// friends list
const chatFriendsList = async (req, res, next) => {
    try {
        const chat = await chat_room_model_1.ChatRoomModelDB.find({
            'users.user_id': req.user.id,
            'users.accept_status': { $ne: false },
            is_group: false,
        });
        if (!chat.length) {
            return (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.DataNotFounded);
        }
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Read, chat);
    }
    catch (error) {
        console.log('error', error);
        next(error);
    }
};
exports.chatFriendsList = chatFriendsList;
/**
 * Message Portion
 */
// send Message to friend
const messageSend = async (req, res, next) => {
    try {
        const { message, chat_room_id } = req.body;
        const chatMessage = await new message_model_1.MessageModelDB({
            chat_room_id,
            message,
            sender_user_id: req.user.id,
        });
        await chatMessage.save();
        if (!chatMessage) {
            throw new bad_request_1.BadRequest('Message Not Send !!!');
        }
        (0, responseSend_1.sendResponse)(res, 201, responseSend_1.MessageStatus.MessageSend, chatMessage);
    }
    catch (error) {
        console.log('error', error);
        next(error);
    }
};
exports.messageSend = messageSend;
// open chat message
const messageAll = async (req, res, next) => {
    try {
        const { id } = req.params;
        // first check, if this user is member of the chat_room
        const chatRoom = await chat_room_model_1.ChatRoomModelDB.findOne({
            _id: id,
            'users.user_id': req.user.id,
        });
        if (!chatRoom) {
            throw new bad_request_1.BadRequest('Not member of this chat !!!');
        }
        const chatMessage = await message_model_1.MessageModelDB.find({
            chat_room_id: id,
        }).populate({
            path: 'chat_room_id',
            select: 'chat_room is_group group_admin_users users.user_id',
        });
        (0, responseSend_1.sendResponse)(res, 200, responseSend_1.MessageStatus.Read, chatMessage);
    }
    catch (error) {
        next(error);
    }
};
exports.messageAll = messageAll;
//# sourceMappingURL=chat.controller.js.map