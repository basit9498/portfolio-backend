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
const validation_middleware_1 = require("../middlewares/validation.middleware");
const portfolioValidation = __importStar(require("../validations/portfolio.validation"));
const route = express_1.default.Router();
exports.portfolioRoute = route;
/**
 * Portfolio
 * create
 * (Auth Required)
 */
route.post('/portfolio', 
// isAuth,
portfolioValidation.portfolioCreateValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolio);
route.get('/portfolio', portfolioValidation.portfolioGetValidation, validation_middleware_1.validationMiddleware, PortfolioController.getPortfolio);
// ----------------------------------------------------------------------------------
/**
 * Portfolio Skill
 * Create,Update, Delete
 * (Auth Required)
 */
route.post('/portfolio/skill', 
// isAuth,
portfolioValidation.portfolioSkillValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioSkill);
route.put('/portfolio/skill/:id', 
// isAuth,
portfolioValidation.portfolioSkillValidation, portfolioValidation.portfolioSkillUpdateValidation, validation_middleware_1.validationMiddleware, PortfolioController.updatePortfolioSkill);
route.delete('/portfolio/skill/:id', 
// isAuth,
portfolioValidation.portfolioSkillDeleteValidation, validation_middleware_1.validationMiddleware, PortfolioController.deletePortfolioSkill);
// ----------------------------------------------------------------------------------
/**
 * Portfolio Social Links
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/social-link', 
// isAuth,
portfolioValidation.portfolioSocialLinkValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioSocialLink);
// ----------------------------------------------------------------------------------
/**
 *  Portfolio experiences
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/experiences', 
// isAuth,
portfolioValidation.portfolioExperienceValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioExperiences);
// ----------------------------------------------------------------------------------
/**
 *  Portfolio projects
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/project', 
// isAuth,
portfolioValidation.portfolioProjectValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioProject);
// ----------------------------------------------------------------------------------
/**
 *  Portfolio services
 * Create,Delete,update
 * (Auth Required)
 */
route.post('/portfolio/service', 
// isAuth,
portfolioValidation.portfolioServiceValidation, validation_middleware_1.validationMiddleware, PortfolioController.createPortfolioService);
//# sourceMappingURL=portfolio.route.js.map