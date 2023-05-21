"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//
// interface UserJWTDecode {
//   id: string;
//   email: string;
// }
const isAuth = (req, res, next) => {
    const getHeaderAuthBearerToken = req.headers.authorization;
    if (!getHeaderAuthBearerToken) {
        const error = new Error('Invalid Authorization !!!');
        return next(error.message);
    }
    try {
        const decode = jsonwebtoken_1.default.verify(getHeaderAuthBearerToken.split(' ')[1], process.env.AUTH_TOKEN);
        req.user = {
            id: decode.id,
            email: decode.email,
        };
    }
    catch (error) {
        const errorMessage = new Error('Token has been expired!!!');
        return next(errorMessage.message);
    }
    next();
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.middleare.js.map