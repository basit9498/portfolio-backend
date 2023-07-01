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
  // isAuth,
  portfolioValidation.portfolioCreateValidation,
  validationMiddleware,
  PortfolioController.createPortfolio
);
route.get(
  '/portfolio',
  portfolioValidation.portfolioGetValidation,
  validationMiddleware,
  PortfolioController.getPortfolio
);
// ----------------------------------------------------------------------------------

/**
 * Portfolio Skill
 * Create,Update, Delete
 * (Auth Required)
 */
route.post(
  '/portfolio/skill',
  // isAuth,
  portfolioValidation.portfolioSkillValidation,
  validationMiddleware,
  PortfolioController.createPortfolioSkill
);

route.put(
  '/portfolio/skill/:id',
  // isAuth,
  portfolioValidation.portfolioSkillValidation,
  portfolioValidation.portfolioSkillUpdateValidation,
  validationMiddleware,
  PortfolioController.updatePortfolioSkill
);

route.delete(
  '/portfolio/skill/:id',
  // isAuth,
  portfolioValidation.portfolioSkillDeleteValidation,
  validationMiddleware,
  PortfolioController.deletePortfolioSkill
);

// ----------------------------------------------------------------------------------

/**
 * Portfolio Social Links
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
 *  Portfolio experiences
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/experiences',
  // isAuth,
  portfolioValidation.portfolioExperienceValidation,
  validationMiddleware,
  PortfolioController.createPortfolioExperiences
);
// ----------------------------------------------------------------------------------

/**
 *  Portfolio projects
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/project',
  // isAuth,
  portfolioValidation.portfolioProjectValidation,
  validationMiddleware,
  PortfolioController.createPortfolioProject
);
// ----------------------------------------------------------------------------------

/**
 *  Portfolio services
 * Create,Delete,update
 * (Auth Required)
 */
route.post(
  '/portfolio/service',
  // isAuth,
  portfolioValidation.portfolioServiceValidation,
  validationMiddleware,
  PortfolioController.createPortfolioService
);
// ----------------------------------------------------------------------------------
export { route as portfolioRoute };
