import { NextFunction, Request, Response } from 'express';
import { PortfolioInfo } from '../../models/portfolio/info.model';

// Create
export const createPortfolioInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, contact, social_links } = req.body;
  console.log('social_links', social_links);
  try {
    const portfolio = await PortfolioInfo.build({
      name,
      email,
      contact,
      social_links,
    });

    await portfolio.save();

    res.json({ message: 'created_portfoilio_info', data: portfolio });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
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
