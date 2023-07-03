import { NextFunction, Request, Response } from 'express';
import { ChatRoomModelDB } from '../models/chat/chat-room.model';
import { MessageStatus, sendResponse } from '../helpers/responseSend';
import { MessageModelDB } from '../models/chat/message.model';
import { BadRequest } from '../error/bad-request';
import connectToDatabase from '../config/db.config';
import { User } from '../models/user.model';

/**
 * Chat  Portion
 */
export const chatLeaveRoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    // transaction
    // leave chatRoom
    const connection = await connectToDatabase();
    const session = await connection.startSession();

    session.startTransaction();

    const chatRoom = await ChatRoomModelDB.deleteOne(
      {
        _id: id,
        users: { $elemMatch: { user_id: req.user.id } },
      },
      { session }
    );

    if (chatRoom.deletedCount === 0) {
      await session.abortTransaction();
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }

    // delete the messages as well
    const chatMessage = await MessageModelDB.deleteMany(
      { chat_room_id: id },
      { session }
    );

    if (chatMessage.deletedCount === 0) {
      await session.abortTransaction();
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }
    await session.commitTransaction();
    session.endSession();
    sendResponse(res, 200, MessageStatus.Delete);
  } catch (error) {
    next(error);
  }
};

/**
 * Request Portion
 */
// Request
export const chatUserRequest = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { requested_user_id } = req.body;
    /**
     * See many condition
     * 1- if the request already send then throw Message
     */
    const chat = await new ChatRoomModelDB({
      chat_room: 'ONE-TO-ONE',
      users: [
        { user_id: req.user.id, accept_status: true },
        { user_id: requested_user_id, accept_status: false },
      ],
    });

    await chat.save();
    sendResponse(res, 201, MessageStatus.Created, chat);
  } catch (error) {}
};

// Request List
export const chatRequestedList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await ChatRoomModelDB.find({
      users: { $elemMatch: { user_id: req.user.id, accept_status: false } },
    });

    if (!chat.length) {
      return sendResponse(res, 200, MessageStatus.RequestNotFound);
    }
    sendResponse(res, 200, MessageStatus.Read, chat);
  } catch (error) {
    next(error);
  }
};

//  Request accept
export const chatRequestAccept = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const chat = await ChatRoomModelDB.updateOne(
      { _id: id },
      {
        $set: { 'users.$[elem].accept_status': true },
      },
      {
        arrayFilters: [{ 'elem.user_id': req.user.id }],
      }
    );

    if (chat.modifiedCount === 0) {
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }

    sendResponse(res, 200, MessageStatus.Updated);
  } catch (error) {
    next(error);
  }
};

//Request Reject
export const chatRequestReject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const chat = await ChatRoomModelDB.deleteOne({
      _id: id,
      users: { $elemMatch: { user_id: req.user.id } },
    });

    if (chat.deletedCount === 0) {
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }

    sendResponse(res, 200, MessageStatus.Delete);
  } catch (error) {
    next(error);
  }
};

// friends list
export const chatUserList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chatUser = await User.find();
    if (!chatUser.length) {
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }
    sendResponse(res, 200, MessageStatus.Read, chatUser);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};
export const chatFriendsList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const chat = await ChatRoomModelDB.find({
      'users.user_id': req.user.id,
      'users.accept_status': { $ne: false },
      is_group: false,
    });
    if (!chat.length) {
      return sendResponse(res, 200, MessageStatus.DataNotFounded);
    }
    sendResponse(res, 200, MessageStatus.Read, chat);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

/**
 * Message Portion
 */
// send Message to friend
export const messageSend = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message, chat_room_id } = req.body;
    const chatMessage = await new MessageModelDB({
      chat_room_id,
      message,
      sender_user_id: req.user.id,
    });
    await chatMessage.save();
    if (!chatMessage) {
      throw new BadRequest('Message Not Send !!!');
    }
    sendResponse(res, 201, MessageStatus.MessageSend, chatMessage);
  } catch (error) {
    console.log('error', error);
    next(error);
  }
};

// open chat message
export const messageAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // first check, if this user is member of the chat_room
    const chatRoom = await ChatRoomModelDB.findOne({
      _id: id,
      'users.user_id': req.user.id,
    });

    if (!chatRoom) {
      throw new BadRequest('Not member of this chat !!!');
    }

    const chatMessage = await MessageModelDB.find({
      chat_room_id: id,
    }).populate({
      path: 'chat_room_id',
      select: 'chat_room is_group group_admin_users users.user_id',
    });

    sendResponse(res, 200, MessageStatus.Read, chatMessage);
  } catch (error) {
    next(error);
  }
};
