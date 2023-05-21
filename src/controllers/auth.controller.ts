import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { validationResult, Result } from 'express-validator';
import { getErrorDetailMessage } from '../helpers/getErrorDetails';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const result: Result = validationResult(req);

  if (!result.isEmpty()) {
    return next(getErrorDetailMessage(result.array()));
  }

  // Data Saving
  const { name, email, password } = req.body;
  try {
    const user = await User.build({ name, email, password });
    await user.save();
    // Create JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_TOKEN as string,
      {
        expiresIn: '5m',
      }
    );
    res.json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Validation
  const result: Result = validationResult(req);

  if (!result.isEmpty()) {
    return next(getErrorDetailMessage(result.array()));
  }

  //  Match User
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    console.log('user', user);
    if (!user) {
      throw new Error('Invlaid E-Mail and Password');
    }

    // password matching
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invlaid E-Mail and Password');
    }

    // token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_TOKEN as string,
      {
        expiresIn: '1day',
      }
    );
    res.json({ user, token });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};

// Get User Detail
export const userDetailController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ user: user });
  } catch (error) {
    if (error instanceof Error) {
      next(error.message);
    }
  }
};
