"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_route_1 = require("./routes/auth.route");
const dotenv = __importStar(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const db_config_1 = __importDefault(require("./config/db.config"));
const portfolio_route_1 = require("./routes/portfolio.route");
const CustomError_1 = require("./error/CustomError");
const chat_route_1 = require("./routes/chat.route");
const cors_1 = __importDefault(require("cors"));
const swagger_1 = __importDefault(require("./utils/swagger"));
dotenv.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use(auth_route_1.authRoute);
app.use(portfolio_route_1.portfolioRoute);
app.use(chat_route_1.ChatRoute);
// swagger
(0, swagger_1.default)(app, PORT);
// Error Middleware
app.use((error, req, res, next) => {
    if (error instanceof CustomError_1.CustomError) {
        return res
            .status(error.status_code)
            .json({ error: error.serializerError() });
    }
    // res.status(500).json({ error: 'Internal Server Error !!!' });
    res.status(400).json({ error: error });
});
app.use('*', (req, res, next) => {
    res.status(404).send('Not Found !!!!');
});
(0, db_config_1.default)()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`App listening on port http://localhost:${PORT}`);
    });
})
    .catch((error) => {
    console.error('Failed to connect to the database:', error);
});
//# sourceMappingURL=index.js.map