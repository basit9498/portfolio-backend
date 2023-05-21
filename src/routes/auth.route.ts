import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import express from 'express';
import { User } from '../models/user.model';
import { isAuth } from '../middlewares/isAuth.middleare';

const route = express.Router();

//Register
route.post(
  '/auth/register',
  [
    body('name')
      .notEmpty()
      .withMessage('Please Enter Name')
      .bail()
      .isLength({ min: 3, max: 30 })
      .withMessage('Name Length Should be MIN:3 and MAX:30'),
    body('email')
      .notEmpty()
      .withMessage('Please Enter Email')
      .bail()
      .isEmail()
      .bail()
      .custom(async (value) => {
        const checkingEmail = await User.findOne({ email: value });
        if (checkingEmail) {
          throw new Error('E-Mail is already in user!!!');
        }
        return true;
      }),
    body('password')
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8'
      ),
    body('conform_password')
      .notEmpty()
      .withMessage('Please Enter Conform Password')
      .bail()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Conform Password is Not Matched !!!');
        }
        return true;
      }),
  ],
  authController.registerController
);

// Login
route.post(
  '/auth/login',
  [
    body('email')
      .notEmpty()
      .withMessage('Please enter E-Mail')
      .bail()
      .isEmail()
      .withMessage('Please enter valid E-Mail')
      .bail(),
    body('password')
      .notEmpty()
      .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
      .withMessage(
        'Password should be combination of one uppercase , one lower case, one special char, one digit and min 8'
      ),
  ],
  authController.loginController
);

route.get('/auth/me', isAuth, authController.userDetailController);

export { route as authRoute };
