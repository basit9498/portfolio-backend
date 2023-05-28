import { NextFunction, Request, Response } from 'express';
import { PortfolioServiceModel } from '../../models/portfolio/service.model';
import { MessageStatus, sendResponse } from '../../helpers/responseSend';
import { CustomError } from '../../error/CustomError';
import { BadRequest } from '../../error/bad-request';

// create
export const createPortfolioSerivce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, time_duration, detail, features, technology } =
      req.body;

    const service = await PortfolioServiceModel.build({
      user_id,
      name,
      time_duration,
      detail,
      features,
      technology,
    });

    await service.save();
    sendResponse(res, 201, MessageStatus.Created, service);
  } catch (error) {
    next(error);
  }
};

// Delte
export const deletePortfolioSerivce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const service = await PortfolioServiceModel.findByIdAndDelete(id);
    if (!service) {
      throw new BadRequest();
    }
    sendResponse(res, 200, MessageStatus.Delete, service);
  } catch (error) {
    next(error);
  }
};

// update
export const updatePortfolioSerivce = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, time_duration, detail, features, technology } = req.body;

    const service = await PortfolioServiceModel.findByIdAndUpdate(
      id,
      {
        name,
        time_duration,
        detail,
        features,
        technology,
      },
      {
        returnOriginal: false,
      }
    );
    if (!service) {
      throw new BadRequest();
    }
    sendResponse(res, 200, MessageStatus.Updated, service);
  } catch (error) {
    next(error);
  }
};
