"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const authController = __importStar(require("../controllers/auth.controller"));
const express_1 = __importDefault(require("express"));
const isAuth_middleare_1 = require("../middlewares/isAuth.middleare");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const user_validation_1 = require("../validations/user.validation");
const route = express_1.default.Router();
exports.authRoute = route;
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
route.post('/auth/register', user_validation_1.authRegisterValidation, validation_middleware_1.validationMiddleware, authController.registerController);
// Login
route.post('/auth/login', user_validation_1.authLoginValidation, validation_middleware_1.validationMiddleware, authController.loginController);
// Logout
route.get('/auth/logout', isAuth_middleare_1.isAuth, 
// authLogoutValidation,
// validationMiddleware,
authController.logoutController);
route.post('/auth/refresh-token', authController.refreshTokenController);
// Verfiy Account
route.get('/auth/verify', authController.authVerifyAccountController);
route.get('/auth/me', isAuth_middleare_1.isAuth, authController.userDetailController);
//# sourceMappingURL=auth.route.js.map