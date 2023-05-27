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
exports.portfolioRoute = void 0;
const express_1 = __importDefault(require("express"));
const PortfolioInfo = __importStar(require("../controllers/portfolio/info.controller"));
const Portfolio = __importStar(require("../controllers/portfolio/portfolio.controller"));
const route = express_1.default.Router();
exports.portfolioRoute = route;
/**
 * -----Start-----
 * Portfolio Controllers
 * Get,Delete
 * (Auth Required)
 */
route.get('/portfolio', Portfolio.getAllPortfolios);
route.delete('/portfolio/:id', Portfolio.deletePortfolio);
/**
 * -----End-----
 */
// ----------------------------------------------------------------------------------
/**
 * -----Start-----
 * PortfolioInfo Controllers
 * Create,Update
 * (Auth Required)
 */
route.post('/portfolio/info', PortfolioInfo.createPortfolioInfo);
route.put('/portfolio/info/:id', PortfolioInfo.updatePortfolioInfo);
//# sourceMappingURL=portfolio.route.js.map