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
const express_validator_1 = require("express-validator");
const authController = __importStar(require("../controllers/auth.controller"));
const express_1 = __importDefault(require("express"));
const user_model_1 = require("../models/user.model");
const isAuth_middleare_1 = require("../middlewares/isAuth.middleare");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const route = express_1.default.Router();
exports.authRoute = route;
//Register
route.post('/auth/register', [
    (0, express_validator_1.body)('name')
        .notEmpty()
        .withMessage('Please Enter Name')
        .bail()
        .isLength({ min: 3, max: 30 })
        .withMessage('Name Length Should be MIN:3 and MAX:30'),
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Please Enter Email')
        .bail()
        .isEmail()
        .bail()
        .custom(async (value) => {
        const checkingEmail = await user_model_1.User.findOne({ email: value });
        if (checkingEmail) {
            throw new Error('E-Mail is already in user!!!');
        }
        return true;
    }),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8'),
    (0, express_validator_1.body)('conform_password')
        .notEmpty()
        .withMessage('Please Enter Conform Password')
        .bail()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Conform Password is Not Matched !!!');
        }
        return true;
    }),
], validation_middleware_1.validationMiddleware, authController.registerController);
// Login
route.post('/auth/login', [
    (0, express_validator_1.body)('email')
        .notEmpty()
        .withMessage('Please enter E-Mail')
        .bail()
        .isEmail()
        .withMessage('Please enter valid E-Mail')
        .bail(),
    (0, express_validator_1.body)('password')
        .notEmpty()
        .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    })
        .withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8'),
], authController.loginController);
// Verfiy Account
route.get('/auth/verify', authController.authVerifyAccountController);
route.get('/auth/me', isAuth_middleare_1.isAuth, authController.userDetailController);
//# sourceMappingURL=auth.route.js.map