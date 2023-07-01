"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendResponse = exports.MessageStatus = void 0;
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Created"] = "created";
    MessageStatus["Updated"] = "updated";
    MessageStatus["Delete"] = "delete";
    MessageStatus["Read"] = "read";
    MessageStatus["DataNotFounded"] = "Data not founded";
})(MessageStatus = exports.MessageStatus || (exports.MessageStatus = {}));
const sendResponse = (res, status_code, message, data) => {
    return res.status(status_code).json({
        message: message,
        data: data,
    });
};
exports.sendResponse = sendResponse;
//# sourceMappingURL=responseSend.js.map