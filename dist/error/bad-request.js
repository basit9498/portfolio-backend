"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = require("./CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(custom_message = "'Invalid Request Parameter'") {
        super(custom_message);
        this.custom_message = custom_message;
        this.status_code = 400;
    }
    serializerError() {
        return [{ message: this.message }];
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=bad-request.js.map