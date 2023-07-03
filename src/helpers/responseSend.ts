import { Response } from 'express';
export enum MessageStatus {
  Created = 'created',
  Updated = 'updated',
  Delete = 'delete',
  Read = 'read',
  DataNotFounded = 'Data not found !!!',
  RequestNotFound = 'Request not found !!!',
  MessageSend = 'Message Send',
}
export const sendResponse = (
  res: Response,
  status_code: number,
  message: MessageStatus,
  data?: any
): Response => {
  return res.status(status_code).json({
    message: message,
    data: data,
  });
};
