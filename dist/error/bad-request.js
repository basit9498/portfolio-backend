"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequest = void 0;
const CustomError_1 = require("./CustomError");
class BadRequest extends CustomError_1.CustomError {
    constructor(custom_messaage = "'Invalid Request Paramter'") {
        super(custom_messaage);
        this.custom_messaage = custom_messaage;
        this.status_code = 400;
    }
    serializerError() {
        return [{ message: this.message }];
    }
}
exports.BadRequest = BadRequest;
//# sourceMappingURL=bad-request.js.map