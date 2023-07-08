import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { sendMail } from '../helpers/send-email';
import { BadRequest } from '../error/bad-request';
import { ForbiddenError } from '../error/forbidden-error';

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Data Saving
    const { name, email, password } = req.body;
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

    res.status(201).json({ message: 'Please verify your Account' });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //  Match User
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      throw new BadRequest('Invalid E-Mail and Password');
    }

    // password matching
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new BadRequest('Invalid E-Mail and Password');
    }

    // Check the Status
    if (!user.verify_account.status) {
      throw new ForbiddenError();
    }

    // token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_TOKEN as string,
      {
        expiresIn: process.env.AUTH_TOKEN_TIME,
      }
    );
    // refresh token
    const refresh_token = jwt.sign(
      { id: user.id },
      process.env.AUTH_REFRESH_TOKEN as string,
      { expiresIn: process.env.AUTH_REFRESH_TOKEN_TIME }
    );

    // save token in
    user.login_status.push({ token: refresh_token });
    await user.save();

    // token set in cookies
    res.cookie('refresh_token', refresh_token, {
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.json({ user, token });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.cookies;
    if (!refresh_token) {
      throw new BadRequest('Please provide the token');
    }

    const user = await User.updateOne(
      { _id: req.user.id },
      {
        $pull: { login_status: { token: refresh_token } },
      }
    );

    if (!user) {
      throw new BadRequest('Something is wrong please logout again !!!');
    }

    res.clearCookie('token');
    res.status(200).json({
      message: 'Logout successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Refresh Token
export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refresh_token } = req.cookies;

    if (!refresh_token) {
      throw new BadRequest('Token is not founded!!!');
    }

    // Check refresh token expire
    const decode_refresh_token = jwt.verify(
      refresh_token,
      process.env.AUTH_REFRESH_TOKEN as string
    ) as JwtPayload;

    const user = await User.findById(decode_refresh_token.id);

    if (!user) {
      throw new BadRequest();
    }
    // token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_TOKEN as string,
      {
        expiresIn: process.env.AUTH_TOKEN_TIME,
      }
    );
    res.status(200).json({
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Verify Account
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
    user.account_status = true;

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

//User Avatar
export const userAvatarUploading = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const image = req.file;
    if (!req.file) {
      throw new BadRequest('Avatar field is missing !!!');
    }
    if (image?.fieldname !== 'avatar') {
      throw new BadRequest('Avatar field is missing !!!');
    }

    const baseUrl = `http://${req.headers.host}/upload/`;

    const user = await User.updateOne(
      { _id: req.user.id },
      {
        $set: { avatar: baseUrl + image.filename },
      }
    );

    if (user.modifiedCount === 0) {
      return res.status(200).json({
        message: 'Avatar is not updated please try again !!!',
      });
    }

    res.status(200).json({
      message: 'Updated',
    });
  } catch (error) {
    next(error);
  }
};
