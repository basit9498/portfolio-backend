"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// export const dataBaseConnection = (callback: () => void) => {
//   mongoose
//     .connect(`${process.env.DATABASR_URL}`)
//     .then(() => {
//       callback();
//     })
//     .catch((err) => {
//       // eslint-disable-next-line no-console
//       console.log('Database is not connected please check the server!!!', err);
//     });
// };
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};
exports.default = connectToDatabase;
//# sourceMappingURL=db.config.js.map