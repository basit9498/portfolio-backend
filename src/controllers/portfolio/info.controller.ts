import { NextFunction, Request, Response } from 'express';
import { PortfolioInfo } from '../../models/portfolio/info.model';
import { validationResult, Result } from 'express-validator';
import { getErrorDetailMessage } from '../../helpers/getErrorDetails';
import { RequestValidationError } from '../../error/ValidationError';

// Create
export const createPortfolioInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, contact, social_links } = req.body;
    const portfolio = await PortfolioInfo.build({
      name,
      email,
      contact,
      social_links,
    });

    await portfolio.save();

    res.json({ message: 'created_portfoilio_info', data: portfolio });
  } catch (error) {
    next(error);
  }
};

// Update
export const updatePortfolioInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const id = req.params.id;
  const { name, contact, social_links } = req.body;
  try {
    const portfolio = await PortfolioInfo.findByIdAndUpdate(
      id,
      { name, contact, social_links },
      { returnOriginal: false }
    );

    await portfolio?.save();

    res.json({ message: 'Updated_portfoilio_info', data: portfolio });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};
