import { NextFunction, Request, Response } from 'express';
import { MessageStatus, sendResponse } from '../helpers/responseSend';
import { PortfolioModelDB } from '../models/portfolio.model';
import searchingQuery from '../utils/searchingQuery';
import { BadRequest } from '../error/bad-request';

/**
 *Portfolio Info Section
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

export const getPortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, page = 1, limit = 10, name = '' } = req.query;

    let parsedPage = parseInt(page.toString(), 10);
    let parsedLimit = parseInt(limit.toString(), 10);

    let portfolio = null;
    let data = null;

    if (id) {
      portfolio = await PortfolioModelDB.findById(id);
      data = portfolio;
    } else {
      const searchingQueryResult = searchingQuery(['name', 'email'], req);
      const count = await PortfolioModelDB.find(
        searchingQueryResult
      ).countDocuments();

      if (parsedPage * parsedLimit > count) {
        parsedPage = 1;
        parsedLimit = count;
      }

      portfolio = await PortfolioModelDB.find(searchingQueryResult)
        .limit(parsedLimit * 1)
        .skip((parsedPage - 1) * parsedLimit)
        .exec();

      // logic for next and previous link
      // example if we have 20 rec and as pr one page i will show the limit is 5 and each page
      // limit = 5  and current page = 1 and total count = 20

      let next = null,
        previous = null;
      const mainHostPath = `http://${req.headers.host}`;

      // next link generation
      if (parsedPage * parsedLimit < count) {
        next = `${mainHostPath}/portfolio?page=${
          parsedPage + 1
        }&limit=${parsedLimit}`;
      }

      // previous link generation
      if (parsedLimit < parsedLimit * parsedPage) {
        previous = `${mainHostPath}/portfolio?page=${
          parsedPage - 1
        }&limit=${parsedLimit}`;
      }

      data = {
        data: portfolio,
        total: count,
        next,
        previous,
      };
    }

    if (!portfolio) {
      return sendResponse(res, 200, MessageStatus.DataNotFounded, null);
    }

    sendResponse(res, 200, MessageStatus.Read, data);
  } catch (error) {
    next(error);
  }
};

/**
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

export const updatePortfolioSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, experience, visibility } = req.body;
    const { id } = req.params;

    const portfolio = await PortfolioModelDB.updateOne(
      { _id: user_id, 'skills._id': id },
      {
        $set: {
          'skills.$[elem].name': name,
          'skills.$[elem].experience': experience,
          'skills.$[elem].visibility': visibility,
        },
      },
      {
        arrayFilters: [{ 'elem._id': id }],
        returnOriginal: false,
      }
    );

    if (portfolio.modifiedCount === 0) {
      throw new BadRequest('Id not founded!!!');
    }
    sendResponse(res, 200, MessageStatus.Updated);
  } catch (error) {
    next(error);
  }
};

export const deletePortfolioSkill = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;

    const portfolio = await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $pull: {
          skills: { _id: id },
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (portfolio.modifiedCount === 0) {
      throw new BadRequest('Id not founded!!!');
    }

    sendResponse(res, 200, MessageStatus.Delete);
  } catch (error) {
    next(error);
  }
};

/**
 *Social Section
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

export const updatePortfolioSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, link, visibility } = req.body;
    const { id } = req.params;

    const portfolio = await PortfolioModelDB.updateOne(
      { _id: user_id, 'social_links._id': id },
      {
        $set: {
          'social_links.$[elem].name': name,
          'social_links.$[elem].link': link,
          'social_links.$[elem].visibility': visibility,
        },
      },
      {
        arrayFilters: [{ 'elem._id': id }],
        returnOriginal: false,
      }
    );

    if (portfolio.modifiedCount === 0) {
      throw new BadRequest('Id not founded!!!');
    }
    sendResponse(res, 200, MessageStatus.Updated);
  } catch (error) {
    next(error);
  }
};

export const deletePortfolioSocialLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;

    const portfolio = await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $pull: {
          social_links: { _id: id },
        },
      },
      {
        returnOriginal: false,
      }
    );

    if (portfolio.modifiedCount === 0) {
      throw new BadRequest('Id not founded!!!');
    }

    sendResponse(res, 200, MessageStatus.Delete);
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

/**
 *projects Section
 */

export const createPortfolioProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user_id, name, type, platform, link, visibility } = req.body;
    await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $push: { projects: { name, type, platform, link, visibility } },
      }
    );
    sendResponse(res, 201, MessageStatus.Created);
  } catch (error) {
    next(error);
  }
};

/**
 * Service Section
 */

export const createPortfolioService = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      user_id,
      name,
      time_duration,
      detail,
      features,
      technology,
      visibility,
    } = req.body;
    await PortfolioModelDB.updateOne(
      { _id: user_id },
      {
        $push: {
          services: {
            name,
            time_duration,
            detail,
            features,
            technology,
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
