"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const checkPortfolioValidation = (0, express_validator_1.checkSchema)({
    name: {
        notEmpty: true,
        escape: true,
        errorMessage: 'Enter Valid Name',
    },
});
exports.default = checkPortfolioValidation;
//# sourceMappingURL=portfolio.validation.js.map