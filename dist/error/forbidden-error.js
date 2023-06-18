"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForbiddenError = void 0;
const CustomError_1 = require("./CustomError");
class ForbiddenError extends CustomError_1.CustomError {
    constructor(custom_message = 'Please active your active!!!') {
        super(custom_message);
        this.custom_message = custom_message;
        this.status_code = 403;
    }
    serializerError() {
        return [{ message: this.custom_message }];
    }
}
exports.ForbiddenError = ForbiddenError;
//# sourceMappingURL=forbidden-error.js.map