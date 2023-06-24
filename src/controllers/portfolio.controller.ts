import { NextFunction, Request, Response } from 'express';
import { MessageStatus, sendResponse } from '../helpers/responseSend';
import { PortfolioModelDB } from '../models/portfolio.model';

/**
 *Portfilio Info Section
 */
export const createPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, contact, social_links } = req.body;
    const portfolio = await PortfolioModelDB.build({
      name,
      email,
      contact,
      social_links,
    });
    console.log('portfolio', portfolio);
    sendResponse(res, 201, MessageStatus.Created, portfolio);
  } catch (error) {
    next(error);
  }
};

/**
 *
 *Skill Section
 */

export const createPortfolioSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, experience, visibility } = req.body;
    await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $push: { skills: { name, experience, visibility } },
      },
      {
        returnOriginal: false,
      }
    );
    sendResponse(res, 201, MessageStatus.Created);
  } catch (error) {
    next(error);
  }
};

/**
 *Soical Section
 */
export const createPortfolioSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, link, visibility } = req.body;
    await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $push: {
          social_links: { name, link, visibility },
        },
      }
    );
    sendResponse(res, 201, MessageStatus.Created);
  } catch (error) {
    next(error);
  }
};

/**
 *Experiences Section
 */

export const createPortfolioExperiences = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, role, detail, from_data, to_date, visibility } =
      req.body;
    await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $push: {
          experiences: {
            name,
            role,
            detail,
            from_data,
            to_date,
            visibility,
          },
        },
      }
    );
    sendResponse(res, 201, MessageStatus.Created);
  } catch (error) {
    next(error);
  }
};
