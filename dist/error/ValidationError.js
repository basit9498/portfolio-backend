"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const CustomError_1 = require("./CustomError");
class RequestValidationError extends CustomError_1.CustomError {
    constructor(validationError) {
        super('Invalid Request Paramter');
        this.validationError = validationError;
        this.status_code = 400;
    }
    serializerError() {
        return this.validationError.map((err) => {
            return { message: err.msg, field: err.path };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
//# sourceMappingURL=ValidationError.js.map