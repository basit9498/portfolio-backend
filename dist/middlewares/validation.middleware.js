"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationMiddleware = void 0;
const ValidationError_1 = require("../error/ValidationError");
const express_validator_1 = require("express-validator");
const validationMiddleware = (req, res, next) => {
    const result = (0, express_validator_1.validationResult)(req);
    if (!result.isEmpty()) {
        throw new ValidationError_1.RequestValidationError(result.array());
    }
    next();
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=validation.middleware.js.map