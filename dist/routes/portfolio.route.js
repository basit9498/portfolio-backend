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
const PortfolioController = __importStar(require("../controllers/portfolio.controller"));
const isAuth_middleare_1 = require("../middlewares/isAuth.middleare");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const portfolioValidation = __importStar(require("../validations/portfolio.validation"));
const route = express_1.default.Router();
exports.portfolioRoute = route;
/**
 * Portfolio
 * create
 * (Auth Required)
 */
route.post('/portfolio', isAuth_middleare_1.isAuth, portfolioValidation.portfolioCreateValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolio);
// ----------------------------------------------------------------------------------
/**
 * Portfolio Skill Controller
 * Create,Update
 * (Auth Required)
 */
route.post('/portfolio/skill', 
// isAuth,
portfolioValidation.portfolioSkillValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioSkill);
// ----------------------------------------------------------------------------------
/**
 *  Portfolio Social Links Controller
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/social-link', 
// isAuth,
portfolioValidation.portfolioSocialLinkValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioSocialLink);
// ----------------------------------------------------------------------------------
/**
 *  Portfolio experiences Controller
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/experiences', 
// isAuth,
portfolioValidation.portfolioExperiencesValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioExperiences);
//# sourceMappingURL=portfolio.route.js.map