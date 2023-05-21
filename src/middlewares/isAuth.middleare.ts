import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

//
// interface UserJWTDecode {
//   id: string;
//   email: string;
// }

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const getHeaderAuthBearerToken = req.headers.authorization;
  if (!getHeaderAuthBearerToken) {
    const error = new Error('Invalid Authorization !!!');
    return next(error.message);
  }
  try {
    const decode = jwt.verify(
      getHeaderAuthBearerToken.split(' ')[1],
      process.env.AUTH_TOKEN as string
    ) as JwtPayload;
    req.user = {
      id: decode.id,
      email: decode.email,
    };
  } catch (error) {
    const errorMessage = new Error('Token has been expired!!!');
    return next(errorMessage.message);
  }

  next();
};
