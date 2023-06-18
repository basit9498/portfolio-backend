import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { User } from '../models/user.model';

//
// interface UserJWTDecode {
//   id: string;
//   email: string;
// }

// check is auth using send manual token using header authorization  bearer token
// export const isAuth = (req: Request, res: Response, next: NextFunction) => {
//   const getHeaderAuthBearerToken = req.headers.authorization;
//   console.log(req.cookies);
//   if (!getHeaderAuthBearerToken) {
//     const error = new Error('Invalid Authorization !!!');
//     return next(error.message);
//   }
//   try {
//     console.log('Asdasd');
//     const decode = jwt.verify(
//       getHeaderAuthBearerToken.split(' ')[1],
//       process.env.AUTH_TOKEN as string
//     ) as JwtPayload;
//     req.user = {
//       id: decode.id,
//       email: decode.email,
//     };
//   } catch (error) {
//     if (error instanceof TokenExpiredError) {
//       console.log(error);
//       const { id } = req.body;
//       const { token } = req.params;
//       User.findByIdAndUpdate(
//         id,
//         {
//           $pull: { login_status: { $elemMatch: { token: { $eq: token } } } },
//         },
//         { returnOriginal: false }
//       ).then((res) => {
//         console.log('res', res);
//       });
//       return next(error);
//     }
//     // const errorMessage = new Error('Token has been expired!!!');
//     return next(error);
//   }

//   next();
// };

// check  auth using  header authorization bearer & cookies token
export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const { cookies } = req;
  const getHeaderAuthBearerToken = req.headers.authorization;

  if (!cookies || !getHeaderAuthBearerToken) {
    const error = new Error('Invalid Authorization !!!');
    return next(error.message);
  }
  try {
    // Checking  Token Expiration header token
    const decode_token = jwt.verify(
      getHeaderAuthBearerToken.split(' ')[1],
      process.env.AUTH_TOKEN as string
    ) as JwtPayload;

    req.user = {
      id: decode_token.id,
      email: decode_token.email,
    };
  } catch (error) {
    // if (error instanceof TokenExpiredError) {
    //   const { token } = req.cookies;

    //   User.updateOne(
    //     { _id: req.user.id },
    //     {
    //       $pull: { login_status: { token: token } },
    //     }
    //   ).then((res) => {});
    //   return next(error);
    // }

    return next(error);
  }

  next();
};
