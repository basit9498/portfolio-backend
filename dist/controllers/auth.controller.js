"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailController = exports.authVerifyAccountController = exports.loginController = exports.registerController = void 0;
const user_model_1 = require("../models/user.model");
const express_validator_1 = require("express-validator");
const getErrorDetails_1 = require("../helpers/getErrorDetails");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_email_1 = require("../helpers/send-email");
const bad_request_1 = require("../error/bad-request");
const registerController = async (req, res, next) => {
    // Data Saving
    const { name, email, password } = req.body;
    try {
        const user = await user_model_1.User.build({ name, email, password });
        // generate verfication token
        // Create JWT Token
        const getVerification_token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.VERIFICATION_TOKEN, {
            expiresIn: '1h',
        });
        user.verify_account.token = getVerification_token;
        user.verify_account.status = false;
        (0, send_email_1.sendMail)('Abdul Basit', 'anddeveloper.abdulbasit@gmail.com', getVerification_token);
        await user.save();
        // const token = jwt.sign(
        //   { id: user.id, email: user.email },
        //   process.env.AUTH_TOKEN as string,
        //   {
        //     expiresIn: '5m',
        //   }
        // );
        res.json({ message: 'Please verify your Account' });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
};
exports.registerController = registerController;
const loginController = async (req, res, next) => {
    // Validation
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return next((0, getErrorDetails_1.getErrorDetailMessage)(result.array()));
    }
    //  Match User
    const { email, password } = req.body;
    try {
        const user = await user_model_1.User.findOne({ email: email });
        if (!user) {
            throw new Error('Invlaid E-Mail and Password');
        }
        // password matching
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error('Invlaid E-Mail and Password');
        }
        // token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.AUTH_TOKEN, {
            expiresIn: '1day',
        });
        res.json({ user, token });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
};
exports.loginController = loginController;
// Verfit Account
const authVerifyAccountController = async (req, res, next) => {
    try {
        const { token } = req.query;
        if (!token) {
            throw new bad_request_1.BadRequest('Invalid Token');
        }
        // verify token and expiration
        const decode = jsonwebtoken_1.default.verify(token, process.env.VERIFICATION_TOKEN);
        if (!decode) {
            throw new bad_request_1.BadRequest('Token expire');
        }
        const user = await user_model_1.User.findById(decode?.id);
        if (!user) {
            throw new bad_request_1.BadRequest('User Not Founded');
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
    }
    catch (error) {
        next(error);
    }
};
exports.authVerifyAccountController = authVerifyAccountController;
// Get User Detail
const userDetailController = async (req, res, next) => {
    try {
        const user = await user_model_1.User.findById(req.user.id);
        res.json({ user: user });
    }
    catch (error) {
        if (error instanceof Error) {
            next(error.message);
        }
    }
};
exports.userDetailController = userDetailController;
//
//# sourceMappingURL=auth.controller.js.map