import express from 'express';
import * as PortfolioController from '../controllers/portfolio.controller';
import { isAuth } from '../middlewares/isAuth.middleare';
import { validationMiddleware } from '../middlewares/validation.middleware';
import * as portfolioValidation from '../validations/portfolio.validation';

const route = express.Router();

/**
 * Portfolio
 * create
 * (Auth Required)
 */
route.post(
  '/portfolio',
  isAuth,
  portfolioValidation.portfolioCreateValidation,
  validationMiddleware,
  PortfolioController.createPortfolio
);
// ----------------------------------------------------------------------------------

/**
 * Portfolio Skill Controller
 * Create,Update
 * (Auth Required)
 */
route.post(
  '/portfolio/skill',
  // isAuth,
  portfolioValidation.portfolioSkillValidation,
  validationMiddleware,
  PortfolioController.createPortfolioSkill
);
// ----------------------------------------------------------------------------------

/**
 *  Portfolio Social Links Controller
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/social-link',
  // isAuth,
  portfolioValidation.portfolioSocialLinkValidation,
  validationMiddleware,
  PortfolioController.createPortfolioSocialLink
);
// ----------------------------------------------------------------------------------

/**
 *  Portfolio experiences Controller
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/experiences',
  // isAuth,
  portfolioValidation.portfolioExperiencesValidation,
  validationMiddleware,
  PortfolioController.createPortfolioExperiences
);
// ----------------------------------------------------------------------------------
export { route as portfolioRoute };
