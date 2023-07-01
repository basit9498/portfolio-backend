"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioGetValidation = exports.portfolioServiceValidation = exports.portfolioProjectValidation = exports.portfolioExperienceValidation = exports.portfolioSocialLinkValidation = exports.portfolioSkillDeleteValidation = exports.portfolioSkillUpdateValidation = exports.portfolioSkillValidation = exports.portfolioCreateValidation = void 0;
const express_validator_1 = require("express-validator");
const all_validation_data_1 = require("./all-validation-data");
exports.portfolioCreateValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'name',
        },
        {
            type: 'email',
        },
        {
            type: 'contact',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioSkillValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'name',
        },
        {
            type: 'experience',
        },
        {
            type: 'user_id',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioSkillUpdateValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'id',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioSkillDeleteValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'id',
        },
        {
            type: 'user_id',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioSocialLinkValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'name',
        },
        {
            type: 'link',
        },
        {
            type: 'user_id',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioExperienceValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'user_id',
        },
        {
            type: 'name',
        },
        {
            type: 'role',
        },
        {
            type: 'detail',
        },
        {
            type: 'from_data',
        },
        {
            type: 'to_date',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioProjectValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'user_id',
        },
        {
            type: 'name',
        },
        {
            type: 'type',
        },
        {
            type: 'platform',
        },
        {
            type: 'link',
        },
    ], all_validation_data_1.validationParameters),
});
exports.portfolioServiceValidation = (0, express_validator_1.checkSchema)({
    ...(0, all_validation_data_1.getValidationParameters)([
        {
            type: 'user_id',
        },
        {
            type: 'name',
        },
        {
            type: 'time_duration',
        },
        {
            type: 'detail',
        },
        {
            type: 'features',
        },
        {
            type: 'technology',
        },
    ], all_validation_data_1.validationParameters),
    'technology.*.name': {
        notEmpty: {
            errorMessage: 'Please enter the technology name!!!',
            bail: true,
        },
        isString: true,
    },
    'technology.*.experience': {
        notEmpty: {
            errorMessage: 'Please enter the technology experience!!!',
            bail: true,
        },
        isString: true,
    },
});
exports.portfolioGetValidation = (0, express_validator_1.checkSchema)({
    id: {
        in: ['query'],
        optional: true,
        isMongoId: {
            errorMessage: 'Invalid Id!!!',
        },
    },
});
//# sourceMappingURL=portfolio.validation.js.map