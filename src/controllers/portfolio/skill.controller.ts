import { NextFunction, Request, Response } from 'express';
import { PortfolioSkillModel } from '../../models/portfolio/skill.model';
import { MessageStatus, sendResponse } from '../../helpers/responseSend';
import { CustomError } from '../../error/CustomError';
import { BadRequest } from '../../error/bad-request';

// Create
export const createSkillPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, experience, visibility } = req.body;
    const skill = await PortfolioSkillModel.build({
      user_id,
      name,
      experience,
      visibility,
    });
    if (!skill) {
      throw new BadRequest();
    }
    await skill.save();
    sendResponse(res, 201, MessageStatus.Created, skill);
  } catch (error) {
    next(error);
  }
};

// Delete
export const deleteSkillPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const skill = await PortfolioSkillModel.findByIdAndDelete(id);

    if (!skill) {
      throw new BadRequest();
    }
    sendResponse(res, 200, MessageStatus.Delete, skill);
  } catch (error) {
    next(error);
  }
};

// Update
export const updateSkillPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { name, experience, visibility } = req.body;
    const skill = await PortfolioSkillModel.findByIdAndUpdate(
      id,
      {
        name,
        experience,
        visibility,
      },
      {
        returnOriginal: false,
      }
    );

    if (!skill) {
      throw new BadRequest();
    }
    sendResponse(res, 200, MessageStatus.Updated, skill);
  } catch (error) {
    next(error);
  }
};
