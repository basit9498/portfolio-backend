import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import { validationResult, Result } from 'express-validator';
import { getErrorDetailMessage } from '../helpers/getErrorDetails';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendMail } from '../helpers/send-email';
import { BadRequest } from '../error/bad-request';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Data Saving
  const { name, email, password } = req.body;
  try {
    const user = await User.build({ name, email, password });
    // generate verfication token

    // Create JWT Token
    const getVerification_token = jwt.sign(
      { id: user.id },
      process.env.VERIFICATION_TOKEN as string,
      {
        expiresIn: '1h',
      }
    );

    user.verify_account.token = getVerification_token;
    user.verify_account.status = false;

    sendMail(
      'Abdul Basit',
      'anddeveloper.abdulbasit@gmail.com',
      getVerification_token
    );
    await user.save();

    // const token = jwt.sign(
    //   { id: user.id, email: user.email },
    //   process.env.AUTH_TOKEN as string,
    //   {
    //     expiresIn: '5m',
    //   }
    // );

    res.json({ message: 'Please verify your Account' });
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

// Verfit Account
export const authVerifyAccountController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.query;
    if (!token) {
      throw new BadRequest('Invalid Token');
    }
    // verify token and expiration
    const decode = jwt.verify(
      token as string,
      process.env.VERIFICATION_TOKEN as string
    ) as JwtPayload;

    if (!decode) {
      throw new BadRequest('Token expire');
    }

    const user = await User.findById(decode?.id);
    if (!user) {
      throw new BadRequest('User Not Founded');
    }
    if (user.verify_account.status) {
      return res.status(200).json({
        message: 'Account Already Verify',
      });
    }
    user.verify_account.status = true;
    user.verify_account.token = '';

    await user.save();

    res.status(200).json({
      message: 'Account verify',
    });
  } catch (error) {
    next(error);
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

//
