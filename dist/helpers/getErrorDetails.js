"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getErrorDetailMessage = void 0;
const getErrorDetailMessage = (validationResult) => {
    return validationResult.map((rm) => {
        return { field: rm?.path, message: rm.msg };
    });
};
exports.getErrorDetailMessage = getErrorDetailMessage;
//# sourceMappingURL=getErrorDetails.js.map