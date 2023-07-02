"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailController = exports.authVerifyAccountController = exports.refreshTokenController = exports.logoutController = exports.loginController = exports.registerController = void 0;
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const send_email_1 = require("../helpers/send-email");
const bad_request_1 = require("../error/bad-request");
const forbidden_error_1 = require("../error/forbidden-error");
const registerController = async (req, res, next) => {
    try {
        // Data Saving
        const { name, email, password } = req.body;
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
        res.json({ message: 'Please verify your Account' });
    }
    catch (error) {
        next(error);
    }
};
exports.registerController = registerController;
const loginController = async (req, res, next) => {
    //  Match User
    try {
        const { email, password } = req.body;
        const user = await user_model_1.User.findOne({ email: email });
        if (!user) {
            throw new bad_request_1.BadRequest('Invlaid E-Mail and Password');
        }
        // password matching
        const passwordMatch = await bcrypt_1.default.compare(password, user.password);
        if (!passwordMatch) {
            throw new bad_request_1.BadRequest('Invlaid E-Mail and Password');
        }
        // Check the Status
        if (!user.verify_account.status) {
            throw new forbidden_error_1.ForbiddenError();
        }
        // token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.AUTH_TOKEN, {
            expiresIn: '1h',
        });
        // refresh token
        const refresh_token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.AUTH_REFRESH_TOKEN, { expiresIn: '2h' });
        // save token in
        user.login_status.push({ token: refresh_token });
        await user.save();
        // token set in cookies
        res.cookie('refresh_token', refresh_token, {
            maxAge: 2 * 60 * 60 * 1000,
            httpOnly: true,
        });
        res.json({ user, token });
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
const logoutController = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        if (!refresh_token) {
            throw new bad_request_1.BadRequest('Please provide the token');
        }
        const user = await user_model_1.User.updateOne({ _id: req.user.id }, {
            $pull: { login_status: { token: refresh_token } },
        });
        if (!user) {
            throw new bad_request_1.BadRequest('Something is wrong please logout again !!!');
        }
        res.clearCookie('token');
        res.status(200).json({
            message: 'Logout successfully',
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
// Refresh Token
const refreshTokenController = async (req, res, next) => {
    try {
        const { refresh_token } = req.cookies;
        if (!refresh_token) {
            throw new bad_request_1.BadRequest('Token is not founded!!!');
        }
        // Check refresh token expire
        const decode_refresh_token = jsonwebtoken_1.default.verify(refresh_token, process.env.AUTH_REFRESH_TOKEN);
        const user = await user_model_1.User.findById(decode_refresh_token.id);
        if (!user) {
            throw new bad_request_1.BadRequest();
        }
        // token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.AUTH_TOKEN, {
            expiresIn: '1h',
        });
        res.status(200).json({
            token,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshTokenController = refreshTokenController;
// Verify Account
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
        user.account_status = true;
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