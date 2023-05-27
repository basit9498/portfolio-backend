"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomError = void 0;
class CustomError extends Error {
    constructor(message, status) {
        super();
        this.message = message;
        this.status_code = status;
    }
    serializer() {
        return { message: this.message, status_code: this.status_code };
    }
}
exports.CustomError = CustomError;
//# sourceMappingURL=CustomError.js.map