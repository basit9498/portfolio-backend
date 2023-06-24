"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.portfolioExperiencesValidation = exports.portfolioSocialLinkValidation = exports.portfolioSkillValidation = exports.portfolioCreateValidation = void 0;
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
exports.portfolioExperiencesValidation = (0, express_validator_1.checkSchema)({
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
//# sourceMappingURL=portfolio.validation.js.map