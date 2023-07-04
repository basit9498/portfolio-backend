import { body } from 'express-validator';
import * as authController from '../controllers/auth.controller';
import express from 'express';
import { User } from '../models/user.model';
import { isAuth } from '../middlewares/isAuth.middleare';
import { validationMiddleware } from '../middlewares/validation.middleware';
import {
  authLoginValidation,
  authLogoutValidation,
  authRegisterValidation,
} from '../validations/user.validation';

const route = express.Router();

//Register
/**
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *        - User
 *      summary: User registration
 *      requestBody:
 *          required: true
 *          content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CreateUserInput'
 *      responses:
 *          201:
 *            description: Success
 *            content:
 *                application/json:
 *                  schema:
 *                     $ref: '#/components/schemas/CreateUserResponse'
 *          400:
 *            description: Bad Request
 *
 *
 *
 */
route.post(
  '/auth/register',
  authRegisterValidation,
  validationMiddleware,
  authController.registerController
);

// Login
route.post(
  '/auth/login',
  authLoginValidation,
  validationMiddleware,
  authController.loginController
);

// Logout
route.get(
  '/auth/logout',
  isAuth,
  // authLogoutValidation,
  // validationMiddleware,
  authController.logoutController
);

route.post('/auth/refresh-token', authController.refreshTokenController);

// Verfiy Account
route.get('/auth/verify', authController.authVerifyAccountController);

route.get('/auth/me', isAuth, authController.userDetailController);

export { route as authRoute };
