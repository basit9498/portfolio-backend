/* eslint-disable comma-dangle */
import { Request, Response } from 'express';

export const loginController = (
  req: Request,
  res: Response
  // next: NextFunction
) => {
  res.send('login Done');
};

export const registerController = (req: Request, res: Response) => {
  console.log(req.body);
  res.send('register');
};
