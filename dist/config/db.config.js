"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
// const connectToDatabase = async () => {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL as string);
//     console.log('Database connected successfully');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     throw error;
//   }
// };
const connectToDatabase = async () => {
    try {
        const connection = await mongoose_1.default.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
        return connection;
    }
    catch (error) {
        console.error('Database connection error:', error);
        throw error;
    }
};
exports.default = connectToDatabase;
//# sourceMappingURL=db.config.js.map