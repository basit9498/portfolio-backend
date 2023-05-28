import { NextFunction, Request, Response } from 'express';
import { PortfolioInfo } from '../../models/portfolio/info.model';
import { CustomError } from '../../error/CustomError';
import { BadRequest } from '../../error/bad-request';

// Get All Portfolio
export const getAllPortfolios = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const portfolio = await PortfolioInfo.find();
    res.json({ message: 'all_portfoilio_info', data: portfolio });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};

// Delete Portfolio
export const deletePortfolio = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  try {
    const portfolio = await PortfolioInfo.findByIdAndDelete(id);
    if (!portfolio) {
      // throw new Error('Id not Founded !!!');
      throw new BadRequest();
    }
    res.json({ message: 'deleted_portfoilio_info', data: portfolio });
  } catch (error) {
    next(error);
  }
};
