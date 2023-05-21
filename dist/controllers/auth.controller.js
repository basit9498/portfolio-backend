"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDetailController = exports.loginController = exports.registerController = void 0;
const user_model_1 = require("../models/user.model");
const express_validator_1 = require("express-validator");
const getErrorDetails_1 = require("../helpers/getErrorDetails");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerController = async (req, res, next) => {
    // Validation
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        return next((0, getErrorDetails_1.getErrorDetailMessage)(result.array()));
    }
    // Data Saving
    const { name, email, password } = req.body;
    try {
        const user = await user_model_1.User.build({ name, email, password });
        await user.save();
        // Create JWT Token
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.AUTH_TOKEN, {
            expiresIn: '5m',
        });
        res.json({ user, token });
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
//# sourceMappingURL=auth.controller.js.map