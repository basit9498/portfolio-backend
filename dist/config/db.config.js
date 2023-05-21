"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataBaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dataBaseConnection = (callback) => {
    mongoose_1.default
        .connect(`${process.env.DATABASR_URL}`)
        .then(() => {
        callback();
    })
        .catch((err) => {
        // eslint-disable-next-line no-console
        console.log('Database is not connected please check the server!!!', err);
    });
};
exports.dataBaseConnection = dataBaseConnection;
//# sourceMappingURL=db.config.js.map