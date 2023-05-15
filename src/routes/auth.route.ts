import * as authController from '../controllers/auth.controller';
import express from 'express';

const route = express.Router();

// Login,Register
route.post('/auth/login', authController.loginController);
route.post('/auth/register', authController.registerController);

export { route as authRoute };
