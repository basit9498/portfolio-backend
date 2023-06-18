"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authLogoutValidation = exports.authLoginValidation = exports.authRegisterValidation = void 0;
const express_validator_1 = require("express-validator");
const user_model_1 = require("../models/user.model");
const all_validation_data_1 = require("./all-validation-data");
exports.authRegisterValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'email',
            include: {
                custom: {
                    options: async (value) => {
                        const checkingEmail = await user_model_1.User.findOne({ email: value });
                        if (checkingEmail) {
                            throw new Error('E-Mail is already in user!!!');
                        }
                        return true;
                    },
                },
            },
        },
        {
            type: 'name',
        },
        {
            type: 'password',
        },
        {
            type: 'conform_password',
        },
    ], all_validation_data_1.authValidationParameters),
});
exports.authLoginValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'email',
        },
        {
            type: 'password',
        },
    ], all_validation_data_1.authValidationParameters),
});
exports.authLogoutValidation = (0, express_validator_1.checkSchema)({
    id: {
        notEmpty: {
            errorMessage: 'Id is missing!!!!',
            bail: true,
        },
        isMongoId: {
            errorMessage: 'Please provide Valid Id',
        },
    },
});
//# sourceMappingURL=user.validation.js.map